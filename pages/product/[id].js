import fs from "fs/promises";
import path from "path";
import { Fragment } from "react";

function ProductPage(params) {
  const { product } = params;

  //if fallback: true
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{product.name}</h1>
    </Fragment>
  );
}

export default ProductPage;

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");

  const file = await fs.readFile(filePath);

  const data = JSON.parse(file);

  return data;
}

export async function getStaticProps(context) {
  console.log("[id]: getStaticProps(context) Run on Server Side");

  const { params } = context;

  const productID = params.id;

  const data = await getData();

  const product = data.products.find((p) => p.id === productID);

  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      product: product,
    },
  };
}

export async function getStaticPaths() {
  console.log("[id]: getStaticPaths() Run on Server Side");

  const data = await getData();

  const ids = data.products.map((p) => p.id);

  const params = ids.map((_id) => ({ params: { id: _id } }));

  return {
    paths: params,
    fallback: true,
  };
}
