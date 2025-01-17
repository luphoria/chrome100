import Link from "next/link";
import Heading from "../components/Heading";
import { getBrands, getTargets } from "../db";
import { cros_brand, cros_target } from "chrome-versions";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  targets: [target: cros_target["board"], brands: cros_brand["brand"][]][];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      targets: (getTargets.all() as cros_target[]).map((target) => [
        target.board,
        (getBrands.all(target.board) as cros_brand[]).map(
          (brand) => brand.brand
        ),
      ]),
    },
  };
};

const HomePage: NextPage<Props> = ({ targets }) => {
  return (
    <>
      <Heading />
      {targets === null ? (
        <p>Loading Chrome OS targets...</p>
      ) : (
        <>
          <h1>Chrome OS Recovery Images</h1>
          <table>
            <thead>
              <tr>
                <th>Board</th>
                <th>Brands</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {targets.map((target, i) => (
                <tr key={i}>
                  <td>
                    <code>{target[0]}</code>
                  </td>
                  <td>{target[1].map((target) => target).join(", ")}</td>
                  <td>
                    <Link
                      style={{ whiteSpace: "nowrap" }}
                      href={`/board/${encodeURIComponent(target[0])}`}
                    >
                      See more
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default HomePage;
