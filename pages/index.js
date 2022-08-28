export default function Home(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      "products": [
        { id: "00", name: "product-00" },
        { id: "01", name: "product-01" },
        { id: "02", name: "product-02" },
      ],
    },
  };
}
