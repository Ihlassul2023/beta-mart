### Start

1. Run the project

```sh
npm start
```

2. run unit tests

```sh
npm test
```

### Information about the API

1.API to add new shelves

```sh
http://localhost:5000/product/newRack
```

with body request

```sh
{
"name": "shelf name",
"capacity": "rack capacity"
}
```

2.API to add new products

```sh
 http://localhost:5000/product/:rack
```

There is a shelf name parameter

```sh
 /:rack
```

the purpose of which is to put products on that shelf,
then there is a request body

```sh
{
name : product_name,
category: product_category,
price : product_price,
stock : product_stock
}
```

3.API for customers to purchase products

```sh
 http://localhost:5000/product/:rack?name=&stok=
```

This api contains a shelf name parameter, for the customer which shelf the product was taken by the customer

```sh
/:rack
```

then there is a query params, for customers, namely the name of the product and how many products in stock they want to take

```sh
?name=&stok=
```

4.The API for customers displays the product on the target shelf

```sh
 http://localhost:5000/product/:rack?pMin=&pMax=&sort=
```

This api contains a shelf name parameter for the shelf you want to target

```sh
/:rack
```

then there are query params for customers looking for products in the specified price range. minimum price and maximum price

```sh
?pMin=&pMax=
```

then there are also query params for customers to search for products from lowest to highest stock on a shelf

```sh
&sort=
```

5.API to display all shelf names

```sh
 http://localhost:5000/product/newRack
```

This API is to display all shelves, this functions to determine the shelf you want to go to to add products, pick up products for customers, and view products. by entering the name of the shelf in the parameters of each endpoint
