import React, { useState } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowRight,
  faEnvelopeOpenText,
  faHand,
  faPaperPlane,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons";
import logo from "../../components/images/Vector.svg";
import fakeApi from "../../data/data.json";
import Post from "../../components/Post";
import GoogleMapReact from "google-map-react";
import Lecture from "../../components/Lecture";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const Posts = () => {
  const center = {
    lat: 54.86463618199356,
    lng: 23.944770457672913,
  };

  const MapOptions = {
    zoomControl: true,
    mapTypeControl: false,
  };
  const postData = fakeApi.posts;

  let postDataRecent = fakeApi.posts;
  if (postDataRecent.length >= 4) {
    postDataRecent = postDataRecent.slice(-4);
  }

  const [sortLocation, setSortLocation] = useState("All");
  const [sortLevel, setSortLevel] = useState("Any");
  const [chosenPost, setChosenPost] = useState(null);
  const [isPostChosen, setPostChosen] = useState(false);

  const handleLocation = (e) => {
    setSortLocation(e.target.value);
  };

  const handleLevel = (e) => {
    setSortLevel(e.target.value);
  };

  return (
    <div className="Section__Posts">
      <Nav image={logo} />
      <div className="background-1"></div>
      <div className="Container__posts">
        <div className="Header__posts">
          <div>
            <h1>Darbo skelbimai</h1>
            <h4>
              Čia galite matyti bei pasiūlyti kitą žmogų į pasirinktą poziciją.
            </h4>
          </div>
          <h3>
            Naujausi skelbimai <FontAwesomeIcon icon={faArrowDown} />
          </h3>
        </div>

        <div
          className={
            isPostChosen
              ? "Container__learning_popup_bg"
              : "Container__learning_popup_bg Opacity"
          }
          onClick={() => (isPostChosen ? setPostChosen(false) : null)}
        ></div>
        <div
          className={
            isPostChosen
              ? "Container__posts_popup"
              : "Container__posts_popup Opacity"
          }
        >
          <div className="Container__learning_popup_header">
            <h2>
              <FontAwesomeIcon
                icon={faEnvelopeOpenText}
                className="Icon__location"
              />
              DevOps programuotojas
            </h2>
            <FontAwesomeIcon
              icon={faX}
              className="Icon__popup"
              onClick={() =>
                isPostChosen || chosenPost === 0 ? setPostChosen(false) : null
              }
            />
          </div>
          <div className="Container__popup_info">
            <div className="Container__popup_details Container__popup_details_posts">
              <div>
                <h4>
                  <FontAwesomeIcon
                    icon={faAnglesUp}
                    className="Icon__location"
                  />
                  Regular/Mid
                </h4>
                <h4>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="Icon__location"
                  />
                  Vilnius, Lietuva
                </h4>

                <h4>
                  <FontAwesomeIcon
                    icon={faCircleDollarToSlot}
                    className="Icon__location"
                  />
                  1750$ - 3000$
                </h4>
              </div>

              <div className="Container__popup_posts_tags">
                <div className="Tag__popup_post_single">DevOps</div>
                <div className="Tag__popup_post_single">Kubernetes</div>
                <div className="Tag__popup_post_single">Cloud</div>
              </div>
            </div>
            <LoadScript googleMapsApiKey="AIzaSyDzILljratmTZbvzMz3ULfqfhRd7nA7LUg">
              <GoogleMap
                mapContainerClassName="Map__popup_posts"
                center={center}
                zoom={17}
                options={MapOptions}
              >
                <></>
              </GoogleMap>
            </LoadScript>
          </div>
          <div className="Container__post_popup_details">
            <div>
              <h4>Aprašymas</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna
                nec tincidunt praesent semper feugiat nibh sed. Sed egestas
                egestas fringilla phasellus faucibus scelerisque eleifend. Ut
                ornare lectus sit amet est. Phasellus vestibulum lorem sed risus
                ultricies. Ut eu sem integer vitae justo eget magna fermentum.
                Felis eget velit aliquet sagittis id. Odio aenean sed adipiscing
                diam donec. Ipsum consequat nisl vel pretium lectus. Et netus et
                malesuada fames ac. Nisi porta lorem mollis aliquam.
              </p>
            </div>
            <div>
              <h4>Reikalavimai</h4>
              <ul>
                <li>mod tempor incididunt ut labore</li>
                <li>ex ea commodo consequat</li>
                <li>xcepteur sint occaecat cupidatat</li>
                <li>officia deserunt mollit</li>
                <li>t dolore magna aliqua</li>
                <li>orem ipsum dolor sit amet</li>
              </ul>
            </div>
          </div>

          <div className="Container__post_popup_apply">
            <h4>Informacija</h4>
            <div className="Container__post_popup_inputs">
              <div className="Container__post_popup_inputs_single">
                <label>Vardas</label>
                <input
                  type="text"
                  className="Input__post"
                  placeholder="Vardenis"
                />
              </div>
              <div className="Container__post_popup_inputs_single">
                <label>Pavardė</label>
                <input
                  type="text"
                  className="Input__post"
                  placeholder="Pavardenis"
                />
              </div>
              <div className="Container__post_popup_inputs_single">
                <label>El. paštas</label>
                <input
                  type="text"
                  className="Input__post"
                  placeholder="v.pavardenis@email.com"
                />
              </div>
              <div className="Container__post_popup_inputs_single">
                <label>Telefono nr.</label>
                <input
                  type="text"
                  className="Input__post"
                  placeholder="+37061234567"
                />
              </div>
            </div>
            <div className="Container__post_popup_cv">
              <p>Įkelkite aplikanto CV (gyvenimo aprašymą)!</p>
            </div>
          </div>

          <div>
            <button
              className="Btn__apply Btn__popup"
              onClick={() => {
                if (isPostChosen) {
                  alert(
                    `Jūs sėkmingai aplikavote į renginį ${chosenPost.title}!`
                  );
                  window.location.reload(false);
                }
              }}
            >
              Siųsti aplikaciją <FontAwesomeIcon icon={faPaperPlane} />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <div className="Container__recent">
          <div className="Container__posts_recent">
            {postDataRecent.map((post, i) => {
              return (
                <Post
                  key={i}
                  post={post}
                  onClick={() => {
                    setChosenPost(post);
                    setPostChosen(true);
                  }}
                  isRecent={true}
                />
              );
            })}
          </div>
        </div>
        <div className="Container__info">
          <h2>Visi skelbimai</h2>
          <div className="Container__picker_posts">
            <div className="Container__sorting_posts">
              <FontAwesomeIcon icon={faLocationDot} className="Icon__pick" />
              <div>
                <p>Vieta</p>
                <select
                  className="Select__restaurant Select__posts"
                  onChange={handleLocation}
                >
                  <option value="All">Visur</option>
                  <option value="Kaunas, Lietuva">Kaunas</option>
                  <option value="Vilnius, Lietuva">Vilnius</option>
                  <option value="Varšuva, Lenkija">Varšuva</option>
                  <option value="Londonas, Anglija">Londonas</option>
                </select>
              </div>
            </div>
            <div className="Container__sorting_posts">
              <FontAwesomeIcon icon={faAnglesUp} className="Icon__pick" />
              <div>
                <p>Lygis</p>
                <select
                  className="Select__restaurant Select__posts"
                  onChange={handleLevel}
                >
                  <option value="Any">Visi</option>
                  <option value="Junior">Junior</option>
                  <option value="Regular/Mid">Regular/Mid</option>
                  <option value="Senior">Senior</option>
                  <option value="Praktika">Praktika</option>
                </select>
              </div>
            </div>

            <div className="Container__search_posts">
              <FontAwesomeIcon icon={faSearch} className="Icon__search" />
              <input type="text" placeholder="Ieškokite tarp skelbimų..." />
            </div>
          </div>
        </div>

        <div className="Container__postings">
          {postData.map((post, i) => {
            if (sortLocation === "All" && sortLevel === "Any") {
              console.log("xddd");
              return (
                <Post
                  key={i}
                  post={post}
                  onClick={() => {
                    setChosenPost(post);
                    setPostChosen(true);
                  }}
                  isRecent={false}
                />
              );
            } else if (
              sortLocation === post.location ||
              sortLevel === post.level
            ) {
              return (
                <Post
                  key={i}
                  post={post}
                  onClick={() => {
                    setChosenPost(post);
                    setPostChosen(true);
                  }}
                  isRecent={false}
                />
              );
            } else if (
              sortLocation === post.location &&
              sortLevel === post.level
            ) {
              return (
                <Post
                  key={i}
                  post={post}
                  onClick={() => {
                    setChosenPost(post);
                    setPostChosen(true);
                  }}
                  isRecent={false}
                />
              );
            }
          })}
          {/* <div className="Container__posting_single">
            <div className="Container__posting_intro">
              <h3>Frontend Engineer</h3>
              <div className="Container__posting_details">
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faAnglesUp} />
                  </div>
                  <p>Junior</p>
                </div>
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <p>Kaunas, Lietuva</p>
                </div>
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} />
                  </div>
                  <p>1750$ - 3000$</p>
                </div>
              </div>
            </div>
            <div>
              <p className="Container__posting_desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur quis ex a nisl fermentum tincidunt quis quis nisi.
                Morbi convallis scelerisque malesuada. Aenean sit amet lectus ac
                nulla porta euismod. Phasellus eget nulla ut elit aliquam
                rutrum. Donec faucibus velit nibh, sit amet elementum purus
                faucibus sit amet. In lorem eros, dignissim hendrerit auctor
                sed, fringilla sit amet tortor. Donec gravida, dolor non ornare
                ultricies, felis urna tristique neque, eu condimentum elit arcu
                at nisi. Nunc sit amet diam in purus dignissim congue a non
                turpis. Mauris at sollicitudin lectus, a ultricies velit.
                Quisque eu magna sagittis, pharetra risus vitae.
              </p>
            </div>
          </div>
          <div className="Container__posting_single">
            <div className="Container__posting_intro">
              <h3>Frontend Engineer</h3>
              <div className="Container__posting_details">
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faAnglesUp} />
                  </div>
                  <p>Junior</p>
                </div>
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <p>Kaunas, Lietuva</p>
                </div>
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} />
                  </div>
                  <p>1750$ - 3000$</p>
                </div>
              </div>
            </div>
            <div>
              <p className="Container__posting_desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur quis ex a nisl fermentum tincidunt quis quis nisi.
                Morbi convallis scelerisque malesuada. Aenean sit amet lectus ac
                nulla porta euismod. Phasellus eget nulla ut elit aliquam
                rutrum. Donec faucibus velit nibh, sit amet elementum purus
                faucibus sit amet. In lorem eros, dignissim hendrerit auctor
                sed, fringilla sit amet tortor. Donec gravida, dolor non ornare
                ultricies, felis urna tristique neque, eu condimentum elit arcu
                at nisi. Nunc sit amet diam in purus dignissim congue a non
                turpis. Mauris at sollicitudin lectus, a ultricies velit.
                Quisque eu magna sagittis, pharetra risus vitae.
              </p>
            </div>
          </div>
          <div className="Container__posting_single">
            <div className="Container__posting_intro">
              <h3>Frontend Engineer</h3>
              <div className="Container__posting_details">
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faAnglesUp} />
                  </div>
                  <p>Junior</p>
                </div>
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <p>Kaunas, Lietuva</p>
                </div>
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} />
                  </div>
                  <p>1750$ - 3000$</p>
                </div>
              </div>
            </div>
            <div>
              <p className="Container__posting_desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur quis ex a nisl fermentum tincidunt quis quis nisi.
                Morbi convallis scelerisque malesuada. Aenean sit amet lectus ac
                nulla porta euismod. Phasellus eget nulla ut elit aliquam
                rutrum. Donec faucibus velit nibh, sit amet elementum purus
                faucibus sit amet. In lorem eros, dignissim hendrerit auctor
                sed, fringilla sit amet tortor. Donec gravida, dolor non ornare
                ultricies, felis urna tristique neque, eu condimentum elit arcu
                at nisi. Nunc sit amet diam in purus dignissim congue a non
                turpis. Mauris at sollicitudin lectus, a ultricies velit.
                Quisque eu magna sagittis, pharetra risus vitae.
              </p>
            </div>
          </div>
          <div className="Container__posting_single">
            <div className="Container__posting_intro">
              <h3>Frontend Engineer</h3>
              <div className="Container__posting_details">
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faAnglesUp} />
                  </div>
                  <p>Junior</p>
                </div>
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <p>Kaunas, Lietuva</p>
                </div>
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} />
                  </div>
                  <p>1750$ - 3000$</p>
                </div>
              </div>
            </div>
            <div>
              <p className="Container__posting_desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur quis ex a nisl fermentum tincidunt quis quis nisi.
                Morbi convallis scelerisque malesuada. Aenean sit amet lectus ac
                nulla porta euismod. Phasellus eget nulla ut elit aliquam
                rutrum. Donec faucibus velit nibh, sit amet elementum purus
                faucibus sit amet. In lorem eros, dignissim hendrerit auctor
                sed, fringilla sit amet tortor. Donec gravida, dolor non ornare
                ultricies, felis urna tristique neque, eu condimentum elit arcu
                at nisi. Nunc sit amet diam in purus dignissim congue a non
                turpis. Mauris at sollicitudin lectus, a ultricies velit.
                Quisque eu magna sagittis, pharetra risus vitae.
              </p>
            </div>
          </div>
          <div className="Container__posting_single">
            <div className="Container__posting_intro">
              <h3>Frontend Engineer</h3>
              <div className="Container__posting_details">
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faAnglesUp} />
                  </div>
                  <p>Junior</p>
                </div>
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <p>Kaunas, Lietuva</p>
                </div>
                <div className="Container__details_single">
                  <div>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} />
                  </div>
                  <p>1750$ - 3000$</p>
                </div>
              </div>
            </div>
            <div>
              <p className="Container__posting_desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur quis ex a nisl fermentum tincidunt quis quis nisi.
                Morbi convallis scelerisque malesuada. Aenean sit amet lectus ac
                nulla porta euismod. Phasellus eget nulla ut elit aliquam
                rutrum. Donec faucibus velit nibh, sit amet elementum purus
                faucibus sit amet. In lorem eros, dignissim hendrerit auctor
                sed, fringilla sit amet tortor. Donec gravida, dolor non ornare
                ultricies, felis urna tristique neque, eu condimentum elit arcu
                at nisi. Nunc sit amet diam in purus dignissim congue a non
                turpis. Mauris at sollicitudin lectus, a ultricies velit.
                Quisque eu magna sagittis, pharetra risus vitae.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Posts;
