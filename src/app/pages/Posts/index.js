import React, { useState } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons";
import logo from "../../components/images/Vector.svg";

const Posts = () => {
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
        <div className="Container__recent">
          <div className="Container__posts_recent">
            <div className="Post__recent">
              <div>
                <h4>Frontend Engineer</h4>

                <div className="Container__recent_details">
                  <div>
                    <FontAwesomeIcon icon={faAnglesUp} />
                  </div>
                  <p>Junior</p>
                </div>
                <div className="Container__recent_details">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <p>Kaunas, Lietuva</p>
                </div>

                <div className="Container__recent_details">
                  <div>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} />
                  </div>
                  <p>1750$ - 3000$</p>
                </div>
              </div>
              <div>
                <p className="Paragraph__time">Paskelbta prieš: 2d.</p>
              </div>
              <div>
                <button className="Btn__apply">
                  Aplikuoti <FontAwesomeIcon icon={faArrowRight} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
            <div className="Post__recent">
              <div>
                <h4>Frontend Engineer</h4>

                <div className="Container__recent_details">
                  <div>
                    <FontAwesomeIcon icon={faAnglesUp} />
                  </div>
                  <p>Junior</p>
                </div>
                <div className="Container__recent_details">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <p>Kaunas, Lietuva</p>
                </div>

                <div className="Container__recent_details">
                  <div>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} />
                  </div>
                  <p>1750$ - 3000$</p>
                </div>
              </div>
              <div>
                <p className="Paragraph__time">Paskelbta prieš: 2d.</p>
              </div>
              <div>
                <button className="Btn__apply">
                  Aplikuoti <FontAwesomeIcon icon={faArrowRight} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
            <div className="Post__recent">
              <div>
                <h4>Frontend Engineer</h4>

                <div className="Container__recent_details">
                  <div>
                    <FontAwesomeIcon icon={faAnglesUp} />
                  </div>
                  <p>Junior</p>
                </div>
                <div className="Container__recent_details">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <p>Kaunas, Lietuva</p>
                </div>

                <div className="Container__recent_details">
                  <div>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} />
                  </div>
                  <p>1750$ - 3000$</p>
                </div>
              </div>
              <div>
                <p className="Paragraph__time">Paskelbta prieš: 2d.</p>
              </div>
              <div>
                <button className="Btn__apply">
                  Aplikuoti <FontAwesomeIcon icon={faArrowRight} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
            <div className="Post__recent">
              <div>
                <h4>Frontend Engineer</h4>

                <div className="Container__recent_details">
                  <div>
                    <FontAwesomeIcon icon={faAnglesUp} />
                  </div>
                  <p>Junior</p>
                </div>
                <div className="Container__recent_details">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <p>Kaunas, Lietuva</p>
                </div>

                <div className="Container__recent_details">
                  <div>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} />
                  </div>
                  <p>1750$ - 3000$</p>
                </div>
              </div>
              <div>
                <p className="Paragraph__time">Paskelbta prieš: 2d.</p>
              </div>
              <div>
                <button className="Btn__apply">
                  Aplikuoti <FontAwesomeIcon icon={faArrowRight} />
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="Container__info">
          <h2>Visi skelbimai</h2>
          <div className="Container__picker_posts">
            <div className="Container__sorting_posts">
              <FontAwesomeIcon icon={faLocationDot} className="Icon__pick" />
              <div>
                <p>Vieta</p>
                <h4>Kaunas</h4>
              </div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="Icon__dropdown"
              />
            </div>
            <div className="Container__sorting_posts">
              <FontAwesomeIcon icon={faAnglesUp} className="Icon__pick" />
              <div>
                <p>Lygis</p>
                <h4>Junior</h4>
              </div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="Icon__dropdown"
              />
            </div>
            <div className="Container__sorting_posts">
              <FontAwesomeIcon icon={faNetworkWired} className="Icon__pick" />
              <div>
                <p>Tipas</p>
                <h4>Programavimas</h4>
              </div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="Icon__dropdown"
              />
            </div>
            <div className="Container__search_posts">
              <FontAwesomeIcon icon={faSearch} className="Icon__search" />
              <input type="text" placeholder="Ieškokite tarp skelbimų..." />
            </div>
          </div>
        </div>
        <div className="Container__postings">
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
        </div>
      </div>
    </div>
  );
};

export default Posts;
