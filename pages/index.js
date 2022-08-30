import path from "path";
import fs from "fs/promises";
import Link from "next/link";

export default function Home(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <Link href={{ pathname: `product/${p.id}` }}>{p.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");

  const file = await fs.readFile(filePath);

  const data = JSON.parse(file);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data-path",
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
