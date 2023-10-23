const fs = require("fs");
const showProduct = () => {
  return JSON.parse(fs.readFileSync("./data/product.json"));
};
const showRack = () => {
  return JSON.parse(fs.readFileSync("./data/rack.json"));
};
const postRack = (req, res) => {
  const { name, capacity } = req.body;
  let racks = showRack();
  if (racks.filter((rack) => rack.name == name && rack.capacity == capacity).length > 0) {
    return res.status(400).json({ msg: `rak dengan nama ${name} sudah tersedia` });
  }
  racks.push(req.body);
  const jsonString = JSON.stringify(racks, null, 2);
  fs.writeFile("./data/rack.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("terimakasih!");
    }
  });
  return res.status(201).json({ msg: "rak baru berhasil di tambahkan" });
};
const postProduct = (req, res) => {
  const { rack } = req.params;
  const { name, stok, category, price } = req.body;
  let products = showProduct();
  let rackAlready = showRack().find((item) => item?.name == rack);
  if (rackAlready) {
    if (products.filter((item) => item.rack == rack).length + parseInt(stok) <= rackAlready.capacity) {
      for (let i = 1; i <= stok; i++) {
        products.push({
          name,
          category,
          rack,
          price,
        });
      }
      let total = products.filter((item) => item.rack == rack && item.name == name).length;
      products = products.map((produk) => {
        if (produk.name == name && produk.rack == rack) {
          produk.stok = total;
        }
        return produk;
      });
      const jsonString = JSON.stringify(products, null, 2);
      fs.writeFile("./data/product.json", jsonString, (err) => {
        if (err) {
          console.log("Error writing file", err);
        } else {
          console.log("terimakasih!");
        }
      });
      res.status(201);
      res.json({ msg: `produk baru berhasil ditambah di rak ${rack}` });
    } else {
      res.status(400);
      res.json({ msg: `rak ${rack} sudah penuh pilih rak lain` });
      return;
    }
  } else {
    res.status(400);
    res.json({ msg: `rak ${rack} tidak tersedia, silahkan buat rak baru` });
  }
};
const deleteProduct = (req, res) => {
  const { rack } = req.params;
  const { name, stok } = req.query;
  let products = showProduct();
  if (products.filter((product) => product.name == name && product.rack == rack).length - parseInt(stok) >= 0) {
    let index = products.indexOf(products.find((product) => product.name == name && product.rack == rack));
    products.splice(index, stok);
    let total = products.filter((item) => item.rack == rack && item.name == name).length;
    products = products.map((produk) => {
      if (produk.name == name && produk.rack == rack) {
        produk.stok = total;
      }
      return produk;
    });
    const jsonString = JSON.stringify(products, null, 2);
    fs.writeFile("./data/product.json", jsonString, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("terimakasih!");
      }
    });
    res.status(200).json({ msg: `produk ${name} di ambil dari rak ${rack}` });
  } else {
    res.status(404).json({ msg: `produk ${name} sudah tidak tersedia atau permintaan melebihi stok` });
  }
};
const getProduct = (req, res) => {
  const { rack } = req.params;
  const { pMin, pMax, sort } = req.query;
  let products = showProduct();
  let rackAlready = showRack().find((item) => item.name == rack);
  let selectProducts = products.filter((product) => product.rack == rack);
  if (selectProducts.length == 0) {
    return res.status(404).json({ msg: `tidak ada produk di rak ${rack}` });
  }
  let selectProducts2 = [...new Set(selectProducts.map((item) => JSON.stringify(item)))].map((item) => JSON.parse(item));
  if (pMin && pMax) {
    selectProducts2 = selectProducts2.filter((item) => parseInt(item.price) >= parseInt(pMin) && parseInt(item.price) <= parseInt(pMax));
  }
  if (sort) {
    selectProducts2.sort((a, b) => a.stok - b.stok);
  }
  res.status(200).json({ data: selectProducts2, remainingCapacity: parseInt(rackAlready.capacity) - selectProducts.length });
};
const getAllRack = (req, res) => {
  let rack = showRack();
  res.status(200).json({ data: rack });
};

module.exports = {
  postRack,
  postProduct,
  getProduct,
  getAllRack,
  deleteProduct,
};
