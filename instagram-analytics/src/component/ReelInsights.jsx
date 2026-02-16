import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './ReelInsights.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ReelInsights = () => {
  const [users, setUsers] = useState([]); // ✅ FIX 1

  const [audienceType, setAudienceType] = useState("gender");
  const [countriesFromApi, setCountriesFromApi] = useState([]);

  const staticAudience = {
    gender: [
      { label: "Men", val: 73 },
      { label: "Women", val: 27 }
    ],
    age: [
      { label: "13-17", val: 17.2 },
      { label: "18-24", val: 22.12 },
      { label: "25-34", val: 27.21 },
      { label: "35-44", val: 2.4 }
    ]
    
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/show");
        setUsers(res.data)
        const d = res.data[0];

        // ✅ convert c1,p1,c2,p2... to array
        const countryArr = [
          { label: d?.c1, val: d?.p1 },
          { label: d?.c2, val: d?.p2 },
          { label: d?.c3, val: d?.p3 },
          { label: d?.c4, val: d?.p4 },
          { label: d?.c5, val: d?.p5 }

        ].filter(item => item.label && item.val !== undefined);

        setCountriesFromApi(countryArr);
      } catch (err) {
        console.error("API ERROR:", err.message);
      }
    };

    getData();
  }, []);




  /* ======================
     REUSABLE ROW
  ====================== */
  const AudienceRow = ({ item }) => (
    <div className="mb-4">
      <div className="d-flex justify-content-between small mb-2">
        <span>{item.label}</span>
        <span className="text-secondary">{item.val}%</span>
      </div>
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${item.val}%` }}
        />
      </div>
    </div>
  );



  return (
    <div className="container-mobile">
      {/* HEADER */}
      <div className="nav-header">
        <div className="d-flex align-items-center">
          <i className="bi bi-arrow-left me-4 fs-4"></i>
          <h5 className="mb-0 fw-bold">Reel insights</h5>
        </div>
        <i className="bi bi-three-dots-vertical fs-5"></i>
      </div>

      {/* REEL PREVIEW */}
      <div className="text-center p-1">
        <div className="reel-preview-img">
          {users.map((ele, index) => (<>
            <img src={ele.img} className="w-100 h-100 object-fit-cover" alt="reel thumbnail" />

          </>))}

        </div>
        {users.map((ele, index) => (
          <>
            <h6 className="fw-bold px-4 mb-1">{ele.title}</h6>
            <p className="text-secondary small">{ele.time}</p>
          </>
        ))}

      </div>

      <hr className="section-line" />

      {/* STATS BAR */}
      <div className="d-flex py-3 reel-stats">
        {users.map((ele, index) => (<>
          <div className="stat-item"><i className="bi bi-heart-fill"></i><span>{ele.like}</span></div>
          <div className="stat-item"><i className="bi bi-chat-fill"></i><span>{ele.cmt}</span></div>
          <div className="stat-item"><i className="bi bi-send-fill"></i><span>{ele.share}</span></div>
          <div className="stat-item"><i className="bi bi-repeat"></i><span>{ele.repost}</span></div>
          <div className="stat-item"><i className="bi bi-bookmark-fill"></i><span>0</span></div>
        </>))}

      </div>

      <hr className="section-line" />

      {/* OVERVIEW */}
      <div className="p-4">

        <h6 className="fw-bold mb-3">Overview <i className="bi bi-info-circle small text-secondary"></i></h6>
        {users.map((ele, index) => (<>
          <div className="insight-row"><span>Views</span><span className="fw-bold">{ele.view}</span></div>
          <div className="insight-row"><span>Watch time</span><span className="fw-bold">{ele.watchtime}</span></div>
          <div className="insight-row"><span>Interactions</span><span className="fw-bold">{ele.like}</span></div>
          <div className="insight-row"><span>Profile activity</span><span className="fw-bold">0</span></div>
        </>))}

      </div>

      <hr className="section-line" />

      {/* VIEWS DONUT */}
      <div className="p-4 text-center">
        <h6 className="text-start fw-bold mb-0">Views <i className="bi bi-info-circle small text-secondary"></i></h6>
        <div className="donut-container">
          <div className="donut-ring"></div>
          <div className="donut-center">
            <div className="text-secondary small text-uppercase" style={{ fontSize: '10px' }}>Views</div>
            {users.map((ele, index) => (<>
              <h1 className="fw-bold mb-0">{ele.view}</h1>

            </>))}
          </div>
        </div>
        <div className="d-flex justify-content-between small mb-2 px-1">
          <span><i className="bi bi-circle-fill me-2" style={{ color: 'var(--ig-pink)', fontSize: '10px' }}></i>Followers</span>
          <span className="fw-bold">1.2%</span>
        </div>
        <div className="d-flex justify-content-between small px-1">
          <span><i className="bi bi-circle-fill me-2" style={{ color: 'var(--ig-purple)', fontSize: '10px' }}></i>Non-followers</span>
          <span className="fw-bold">99.8%</span>
        </div>
      </div>

      <hr className="section-line" />

      {/* VIEWS OVER TIME */}
      <div className="p-4">
        <h6 className="fw-bold mb-3">Views over time</h6>
        <div className="d-flex gap-2 mb-4">
          <button className="pill active">All</button>
          <button className="pill">Followers</button>
          <button className="pill">Non-followers</button>
        </div>
        <div className="px-4">
          <div className="graph-area">
            <span className="y-label" style={{ top: 0 }}>7000</span>
            <span className="y-label" style={{ top: '50%' }}>4000</span>
            <span className="y-label" style={{ bottom: 0 }}>0</span>

  {/* Typical growth */}
<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">

  {/* Typical growth - smoother S curve */}
  <path
    d="
      M 0 100
      Q 12 82, 25 60
      Q 40 42, 55 30
      Q 70 20, 85 14
      Q 95 12, 100 16
    "
    className="line-typical"
    style={{
      fill: "none",
      strokeWidth: 0.7
    }}
  />

  {/* This reel - mid curve compression then strong rise */}
  <path
    d="
      M 0 100
      Q 15 90, 30 72
      Q 45 60, 60 50
      Q 75 35, 88 22
      Q 95 15, 100 8
    "
    className="line-this-reel"
    style={{
      fill: "none",
      strokeWidth: 1
    }}
  />

</svg>
          </div>
          <div className="d-flex justify-content-between text-secondary small px-1 mt-2">
            <span>jan 25</span><span>feb 3</span><span>feb 11</span>
          </div>
        </div>
      </div>

      {/* TOP SOURCES */}
      <div className="p-4">
        <h6 className="fw-bold mb-3">Top sources of views</h6>
        {[
          { label: 'Reels tab', val: 57.9, bar: 57.9 },
          { label: 'Explore', val: 26.0, bar: 26.0 },
          { label: 'Profile', val: 10.1, bar: 10.1 },
          { label: 'Feed', val: 1.1, bar: 1.1 }
        ].map((source, idx) => (
          <div className="mb-4" key={idx}>
            <div className="d-flex justify-content-between small mb-2">
              <span>{source.label}</span>
              <span className="text-secondary">{source.val}%</span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: `${source.bar}%` }}></div>
            </div>
          </div>
        ))}
        {users.map((ele, index) => (<>
          <div className="insight-row"><span>Accounts reached</span><span className="fw-bold">{ele.reach}</span></div>

        </>))}
      </div>

      <hr className="section-line" />

      {/* RETENTION */}
      <div className="p-4 retention-card">
        <h6 className="fw-bold mb-0 text-white">
          Retention <i className="bi bi-info-circle small text-secondary"></i>
        </h6>

        <div className="px-4 mt-4">
          <div className="graph-area dark-graph">
            <span className="y-label" style={{ top: 0 }}>40%</span>
            <span className="y-label" style={{ top: "50%" }}>15%</span>
            <span className="y-label" style={{ bottom: 0 }}>0</span>

            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* grid lines */}
              <line x1="0" y1="25" x2="100" y2="25" className="grid-line" />
              <line x1="0" y1="50" x2="100" y2="50" className="grid-line" />
              <line x1="0" y1="75" x2="100" y2="75" className="grid-line" />

              {/* retention line */}
<path
  d="
    M 0 55
    Q 3 53, 6 55
    Q 9 57, 12 55
    Q 14 54, 15 53

    Q 22 44, 30 40
    Q 37 37, 45 34

    Q 52 33.5, 60 33
    Q 67 32, 75 31

    Q 82 30, 90 29
    Q 97 33, 105 37
    Q 112 33, 120 30

    Q 127 34, 135 38
    Q 142 41, 150 44
    Q 157 47, 165 50
  "
  className="retention-line"
  style={{
    fill: "none",
    strokeWidth: 1.2
  }}
/>


            </svg>
          </div>

          <div className="d-flex justify-content-between text-secondary small px-1 mt-2">
            <span>0:00</span>
            <span>0:18</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="insight-row">
            <span>This reel's skip rate</span>
            <span className="fw-bold">29.1%</span>
          </div>
          <div className="insight-row">
            <span>Your typical skip rate</span>
            <span className="fw-bold">20.6%</span>
          </div>
          <div className="insight-row">
            <span>Average watch time</span>
            <span className="fw-bold">12sec</span>
          </div>
        </div>
      </div>


      <hr className="section-line" />

      {/* INTERACTIONS DONUT */}
      <div className="p-4">
        <h6 className="fw-bold mb-0">Interactions <i className="bi bi-info-circle small text-secondary"></i></h6>
        <div className="donut-container">
          <div className="donut-ring" style={{ borderTopColor: 'var(--ig-pink)', borderRightColor: 'var(--ig-pink)', borderBottomColor: 'var(--ig-pink)', borderLeftColor: 'var(--ig-purple)', transform: 'rotate(45deg)' }}></div>
          <div className="donut-center">
            <div className="text-secondary small" style={{ fontSize: '10px' }}>Interactions</div>
            {users.map((ele, index) => (<>
              <h1 className="fw-bold mb-0">{ele.like}</h1>

            </>))}
          </div>
        </div>
        <div className="d-flex justify-content-between small mb-3">
          <span><i className="bi bi-circle-fill me-2" style={{ color: 'var(--ig-pink)', fontSize: '10px' }}></i>Followers</span>
          <span className="fw-bold">0.0%</span>
        </div>
        <div className="d-flex justify-content-between small">
          <span><i className="bi bi-circle-fill me-2" style={{ color: 'var(--ig-purple)', fontSize: '10px' }}></i>Non-followers</span>
          <span className="fw-bold">100.0%</span>
        </div>
      </div>

      <hr className="section-line" />

      {/* WHEN PEOPLE LIKED */}
      <div className="p-4">
        <h6 className="fw-bold mb-3">When people liked your reel</h6>

        <div className="px-4">
          <div className="graph-area">
            <i className="bi bi-play-fill graph-play-overlay"></i>

            {/* Y-axis labels */}
            <span className="y-label" style={{ top: 0 }}>45%</span>
            <span className="y-label" style={{ top: "50%" }}>12%</span>
            <span className="y-label" style={{ bottom: 0 }}>0</span>

            {/* Graph */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* GRID LINES */}
              <line x1="0" y1="25" x2="100" y2="25" className="grid-line" />
              <line x1="0" y1="50" x2="100" y2="50" className="grid-line" />
              <line x1="0" y1="75" x2="100" y2="75" className="grid-line" />

              {/* PINK GRAPH LINE */}
  <path
  d="
    M 0 35
    Q 12 40, 20 42
    Q 35 28, 45 24
    Q 60 26, 75 27
    Q 90 29, 100 30
  "
  className="retention-line"
  style={{
    fill: "none",
    strokeWidth: 1.2
  }}
/>



            </svg>

          </div>

          {/* X-axis labels */}
          <div className="d-flex justify-content-between text-secondary small px-1 mt-2">
            <span>0:00</span>
            <span>0:18</span>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-4">
          {users.map((ele, index) => (
            <div key={index}>
              <div className="insight-row"><span>Likes</span><span className="fw-bold">{ele.like}</span></div>
              <div className="insight-row"><span>Reposts</span><span className="fw-bold">{ele.repost}</span></div>
              <div className="insight-row"><span>Saves</span><span className="fw-bold">0</span></div>
              <div className="insight-row"><span>Shares</span><span className="fw-bold">{ele.share}</span></div>
              <div className="insight-row"><span>Comments</span><span className="fw-bold">{ele.cmt}</span></div>
            </div>
          ))}
        </div>
      </div>

      <hr className="section-line" />

      {/* PROFILE ACTIVITY */}
      <div className="p-4">
        <h6 className="fw-bold mb-3">Profile activity <i className="bi bi-info-circle small text-secondary"></i></h6>
        <div className="insight-row"><span>Follows</span><span className="fw-bold">0</span></div>
      </div>

      <hr className="section-line" />

      {/* AUDIENCE (DYNAMIC) */}
      {/* AUDIENCE */}
      {/* AUDIENCE */}
      <div className="p-4">
        <h6 className="fw-bold mb-3">
          Audience <i className="bi bi-info-circle small text-secondary"></i>
        </h6>

        {/* BUTTONS */}
        <div className="d-flex gap-2 mb-4">
          {["gender", "country", "age"].map((type) => (
            <button
              key={type}
              className={`pill ${audienceType === type ? "active" : ""}`}
              onClick={() => setAudienceType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* GENDER (STATIC) */}
        {audienceType === "gender" &&
          staticAudience.gender.map((item, idx) => (
            <AudienceRow key={idx} item={item} />
          ))}

        {/* AGE (STATIC) */}
        {audienceType === "age" &&
          staticAudience.age.map((item, idx) => (
            <AudienceRow key={idx} item={item} />
          ))}

        {/* COUNTRY (FROM API: c1 & p1) */}
        {audienceType === "country" &&
          countriesFromApi.map((item, idx) => (
            <AudienceRow key={idx} item={item} />
          ))}

      </div>



      <hr className="section-line" />

      {/* AD SECTION */}
      <div className="p-4">
        <h5 className="fw-bold mb-1" style={{ fontSize: '1.3rem' }}>Ad</h5>
        <div className="ad-row">
          <div className="d-flex align-items-center">
            <i className="bi bi-graph-up-arrow me-3 fs-4"></i>
            <span className="fw-semibold">Boost this reel</span>
          </div>
          <i className="bi bi-chevron-right text-secondary"></i>
        </div>
      </div>
    </div>
  );
};

export default ReelInsights;