import { Fragment, useEffect, useState } from "react";

function SalesPage(params) {
  const [isLoading, SetIsLoading] = useState(true);

  const [sales, SetSalesData] = useState();  

  useEffect(() => {
    SetIsLoading(true);
    fetch(
      "https://client-side-data-fetchin-9d6cf-default-rtdb.firebaseio.com/sales.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const transformedData = [];

        for (const key in data) {
          const _data = { id: key, ...data[key] };
          transformedData.push(_data);
        }
        SetSalesData(transformedData);
        SetIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No Sales Data Found.</p>;
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
