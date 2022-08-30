import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

function SalesPage(props) {
  const [sales, SetSalesData] = useState(props.sales);

  const { data, error } = useSWR(
    "https://client-side-data-fetchin-9d6cf-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    const transformedData = [];

    for (const key in data) {
      const _data = { id: key, ...data[key] };
      transformedData.push(_data);
    }
    SetSalesData(transformedData);
  }, [data]);

  if (error) {
    return <p>Loading...</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <h1>Sales Page</h1>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.name} - Rs.{sale.amount}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
export default SalesPage;

export async function getStaticProps(params) {
  const transformedSalesData = [];
  fetch(
    "https://client-side-data-fetchin-9d6cf-default-rtdb.firebaseio.com/sales.json"
  )
    .then((res) => res.json())
    .then((data) => {
      for (const key in data) {
        const _data = {
          id: key,
          ...data[key],
        };
        transformedSalesData.push(_data);
      }
    });

  return {
    props: { sales: transformedSalesData },
    revalidate: 10,
  };
}
