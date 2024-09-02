"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsvector = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
function genExpWithWeights(input) {
    const columnExpressions = input.map((column, index) => {
        const weight = String.fromCharCode(index + 65);
        return `setweight(to_tsvector('english', coalesce(${column}, '')), '${weight}')`;
    });
    const tsvectorColumn = `tsvector GENERATED ALWAYS AS (${columnExpressions.join(" || ")}) STORED`;
    return tsvectorColumn;
}
exports.tsvector = (0, pg_core_1.customType)({
    dataType(config) {
        if (config) {
            const sources = config.sources.join(" || ' ' || ");
            return config.weighted
                ? genExpWithWeights(config.sources)
                : `tsvector generated always as (to_tsvector('english', ${sources})) stored`;
        }
        else {
            return `tsvector`;
        }
    },
});
