const { postProduct } = require("../../controller/product");

const req = {
  params: {
    rack: "rak1",
  },
  body: {
    name: "tes_product",
    stok: "10000",
    category: "tes_category",
    price: "tes_price",
  },
};
const res = {
  status: jest.fn((x) => x),
  json: jest.fn((x) => x),
};

it("should send status 400 when the rack is full", () => {
  postProduct(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});
