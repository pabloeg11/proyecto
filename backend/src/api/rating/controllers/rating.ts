import crypto from "crypto";
import { getRank } from "../../../utils/ranks";

type TargetType = "review" | "post";

function parseTargetType(v: any): TargetType | null {
  const t = String(v ?? "").trim().toLowerCase();
  return t === "review" || t === "post" ? (t as TargetType) : null;
}

function firstIp(xf?: string) {
  if (!xf) return "";
  return xf.split(",")[0]?.trim() ?? "";
}

export default {
  async vote(ctx) {
    try {
      const body = ctx.request.body ?? {};

      const targetType = parseTargetType(body.targetType);
      const slug = String(body.slug ?? "").trim();
      const value = Number(body.value);

      if (!targetType || !slug || !Number.isFinite(value)) {
        return ctx.badRequest("missing or invalid fields");
      }

      if (value < 1 || value > 10) {
        return ctx.badRequest("invalid value (1-10)");
      }

      const xf = ctx.request.headers["x-forwarded-for"] as string | undefined;
      const ip = firstIp(xf) || ctx.request.ip || "0.0.0.0";
      const userAgent = (ctx.request.headers["user-agent"] as string) || "unknown";

      const anonId = crypto.createHash("sha256").update(ip + userAgent).digest("hex");

      const voterKey = crypto
        .createHash("sha256")
        .update(`${targetType}:${slug}:${anonId}`)
        .digest("hex");

      // 1) mirar si ya votó
      const existing = await strapi.entityService.findMany("api::rating.rating", {
        filters: { voterKey },
        limit: 1,
      });

      // 2) buscar/crear voter
      const voters = await strapi.entityService.findMany("api::voter.voter", {
        filters: { anonId },
        limit: 1,
      });

      let voterEntry: any = Array.isArray(voters) ? voters[0] : null;

      if (!voterEntry) {
        voterEntry = await strapi.entityService.create("api::voter.voter", {
          data: {
            anonId,
            points: 0,
            rank: "novato",
          },
        });
      }

      const currentPoints = Number(voterEntry?.points ?? 0);

      // si ya votó, no sumamos puntos, pero devolvemos su estado igualmente
      if (Array.isArray(existing) && existing.length > 0) {
        return {
          success: false,
          alreadyVoted: true,
          totalPoints: currentPoints,
          rank: voterEntry?.rank ?? getRank(currentPoints),
        };
      }

      // 3) crear rating
      await strapi.entityService.create("api::rating.rating", {
        data: {
          targetType,
          slug,
          value,
          voterKey,
          anonId,
          ipHash: crypto.createHash("sha256").update(ip).digest("hex"),
          userAgentHash: crypto.createHash("sha256").update(userAgent).digest("hex"),
        },
      });

      // 4) sumar puntos y actualizar rango
      const pointsAdded = 10; // si quieres que sume por voto. si prefieres por valor, pon: const pointsAdded = value;
      const newPoints = currentPoints + pointsAdded;
      const newRank = getRank(newPoints);

      const updated = await strapi.entityService.update("api::voter.voter", voterEntry.id, {
        data: {
          points: newPoints,
          rank: newRank,
        },
      });

      return {
        success: true,
        pointsAdded,
        totalPoints: Number(updated?.points ?? newPoints),
        rank: updated?.rank ?? newRank,
      };
    } catch (err) {
      console.error("rating.vote error:", err);
      return ctx.internalServerError("vote failed");
    }
  },
};