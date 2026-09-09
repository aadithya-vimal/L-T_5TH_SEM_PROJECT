function pagination(query = {}) {
  const page = Math.max(Number.parseInt(query.page || 1, 10), 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit || 10, 10), 1), 100);
  return { page, limit, skip: (page - 1) * limit };
}
function meta(page, limit, total) {
  return { page, limit, total, pages: Math.ceil(total / limit) };
}
module.exports = { pagination, meta };
