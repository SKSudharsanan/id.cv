import Icon from "../../assets/svg";

import { udemy } from "../../assets/img";

import { firstLetter } from "../../utils/functions";

const Certificates = () => {
  const credentials = [
    {
      name: "Digital Marketing Manager",
      issuer_name: "Udemy",
      issuer_logo: udemy,
      issued_date: "May 2, 2023",
      is_verified: true,
    },
    {
      name: "SEO Website Integration",
      issuer_name: "Cally Dynasty",
      issuer_logo: null,
      issued_date: "May 2, 2023",
      is_verified: false,
    },
    {
      name: "Advanced Digital Marketing Manager",
      issuer_name: "Udemy",
      issuer_logo: udemy,
      issued_date: "May 2, 2023",
      is_verified: true,
    },
    {
      name: "Marketing Analytics",
      issuer_name: "Lobin School of Arts",
      issuer_logo: null,
      issued_date: "May 2, 2023",
      is_verified: false,
    },
  ];

  return (
    <div className="content_container certificates_container">
      <div className="header">
        <p className="title">Credentials</p>

        <p className="view_all">
          View all <Icon name="chevronRight" />
        </p>
      </div>

      <div className="content">
        {credentials?.map((item, i) => (
          <div key={i} className="certificate">
            <div className="side">
              <div className="d_flex">
                <div className="info">
                  <h6>{item?.name}</h6>
                  <p>{item?.issuer_name}</p>
                </div>

                {item?.issuer_logo ? (
                  <div className="image">
                    <img src={item?.issuer_logo} alt="Issuer logo" />
                  </div>
                ) : (
                  <div className="image">
                    <p className="initial">{firstLetter(item?.issuer_name)}</p>
                  </div>
                )}
              </div>

              <div className="status">
                <Icon name={item?.is_verified ? "verified" : "uploaded"} />
                <p>{item?.is_verified ? "Verified" : "Uploaded"}</p>
              </div>
            </div>

            <div className="side">
              {item?.issuer_logo ? (
                <div className="image">
                  <img src={item?.issuer_logo} alt="Issuer logo" />
                </div>
              ) : (
                <div className="image">
                  <p className="initial">{firstLetter(item?.issuer_name)}</p>
                </div>
              )}

              <p className="date">
                Issued: {new Date(item?.issued_date).toDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
