import { GoRepo, GoVerified } from "react-icons/go";
import { AnchorLink } from ".";
import { Fragment, useEffect, useState } from "react";
import { OrganizedData, getUserInfos, getUsersCount } from "../utils/helper";
import { useSigner } from "@thirdweb-dev/react";

const Sidebar = () => {
  const [total, setTotal] = useState<number>(0);
  const [users, setUsers] = useState<OrganizedData>();

  const signer = useSigner();

  useEffect(() => {
    async function init() {
      const count = await getUsersCount(signer);
      setTotal(count); //setting the count of users...

      const _users = await getUserInfos(signer);
      setUsers(_users);
    }

    init();
  }, [signer]);

  const sectors = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return (
    <div className="sidebar">
      <div className="head px-3 py-5">
        <AnchorLink to="/" className="mb-4 d-inline-block">
          <div className="logo">
            <GoRepo />
          </div>
        </AnchorLink>

        <div className="intro">
          <h2>Directory</h2>
          <p>
            View directory of <span>{total.toLocaleString()}</span> Web3 OAuth
            users
          </p>
        </div>
      </div>

      <div className="body">
        {users
          ? sectors.map(
              (sector) =>
                users[sector] && (
                  <Fragment>
                    <div className="header mb-2">{sector}</div>
                    <ul>
                      {users[sector].map((user, index) => (
                        <li className="list" key={`${user}-${index}`}>
                          <AnchorLink to={`/user/${user.owner}`}>
                            <img src={user.pfp} alt="xx" />
                          </AnchorLink>
                          <div>
                            <p>
                              <AnchorLink to={`/user/${user.owner}`}>
                                @{user.username} <GoVerified />
                              </AnchorLink>
                            </p>
                            <span>{user.email}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Fragment>
                )
            )
          : null}
      </div>
    </div>
  );
};

export default Sidebar;
