import { GoClock, GoCopy, GoPerson, GoVerified } from "react-icons/go";

const User = () => {
  const truncateAddress = (address?: string): string => {
    if (!address) return "null";

    let prefixLength = 8;
    let suffixLength = 6;

    if (address.length <= prefixLength + suffixLength) {
      return address;
    }

    const prefix = address.slice(0, prefixLength);
    const suffix = address.slice(-suffixLength);
    const truncated = `${prefix}....${suffix}`;

    return truncated;
  };

  return (
    <div className="user">
      <div className="header">
        <div className="bg"></div>
        <div className="d-flex align-items-md-center flex-column flex-md-row">
          <img
            src="https://mongodb.vercel.app/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F280212%3Fv%3D4&w=640&q=75"
            alt="x"
          />
          <h2>
            NerdyDev <GoVerified />
          </h2>
        </div>
      </div>

      <div className="px-4 pt-5">
        <div className="col-12 mt-3 mt-md-0">
          <div className="row g-4 g-lg-5">
            <div className="col-12 col-lg-7 mb-4">
              <div className="details">
                <div
                  className="d-flex align-items-center mb-3"
                  style={{ gap: "1rem" }}
                >
                  <hr className="my-0" />
                  <h3 className="my-0">Bio</h3>
                </div>

                <p className="mb-4 pb-1">
                  Tincidunt quam neque in cursus viverra orci, dapibus nec
                  tristique. Nullam ut sit dolor consectetur urna, dui cras nec
                  sed. Cursus risus congue arcu aenean posuere aliquam.
                </p>

                <div className="email">
                  <span>momoreoluwaadedeji@gmail.com</span>
                  <div>
                    <GoCopy />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 mb-5">
              <div className="info">
                <ul>
                  <li>
                    <div>
                      <GoPerson />
                      <span>
                        {truncateAddress(
                          "0xEa97722A3183586cF1fe6170ab05E0f97c5a438D"
                        )}
                      </span>
                    </div>
                    <GoCopy />
                  </li>
                  <li>
                    <div>
                      <GoClock />
                      <span>Oct. 28, 2023</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-5 mt-3 powered">
        Powered by:-&nbsp;&nbsp;<strong>Web3 OAuth</strong>
      </div>
    </div>
  );
};

export default User;
