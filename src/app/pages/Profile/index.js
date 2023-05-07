import React, { useState } from "react";
import Nav from "../../components/Nav";
import "./index.css";
import logo from "../../components/images/Vector.svg";
import image from "../../components/images/photo-1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown, faEnvelope, faPhone, faSave } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input";
import Heading from "../../components/Heading";
import fakeApi from "../../data/data.json";

const Profile = () => {
  const genders = fakeApi.genders;
  const [selected, setSelected] = useState(genders[0].value);

  return (
    <div className="Section__profile">
      <div className="Color__block"></div>
      <Nav image={logo} />
      <div className="Container__profile">
        <div className="Header__profile">
          <div>
            <h1 className="Heading_1__white">Jūsų profilis</h1>
            <h4>
              Čia galite matyti ar keisti savo asmeninę bei kitą informaciją.
            </h4>
          </div>
          {/* <h3>
          <FontAwesomeIcon icon="fa-sharp fa-solid fa-hat-chef" />
            Mano veikla <FontAwesomeIcon icon={faArrowDown} />
          </h3> */}
        </div>
        <div className="Container__profile_intro">
          <div className="Container__profile_details">
            <img
              className="Image__profile"
              src={image}
              alt="profile_image"
            ></img>
            <div>
              <h1>Vardenis Pavardenis</h1>
              <h3>Frontend Programuotojas</h3>
              <h4>Kaunas, Lithuania</h4>
            </div>
          </div>
          <div className="Container__profile_contacts">
            <div>
              <FontAwesomeIcon className="Icon__social" icon={faPhone} />
              <h4> +37061234567</h4>
            </div>
            <div>
              <FontAwesomeIcon className="Icon__social" icon={faEnvelope} />
              <h4> vardenis.pavardenis@devbridge.com</h4>
            </div>
          </div>
          <div className="Container__profile_socials">
            <div className="Container__profile_socials_single">
              <FontAwesomeIcon id="linkedin" className="Icon__social" icon={faLinkedinIn} />
            </div>
            <div className="Container__profile_socials_single">
              <FontAwesomeIcon id="twitter" className="Icon__social" icon={faTwitter} />
            </div>
            <div className="Container__profile_socials_single">
              <FontAwesomeIcon id="github" className="Icon__social" icon={faGithub} />
            </div>
          </div>
        </div>
        <div className="Container__profile_edit">
          <div className="Container__profile_edit_header">
            <h2>Asmeninė informacija</h2>
            <div className="Container__edit" onClick={() => alert("Informacija išsaugota!")}>
              <h3>Išsaugoti</h3>
              <FontAwesomeIcon className="Icon__edit" icon={faSave} />
            </div>
          </div>
          <div className="Container__profile_form">
            <div>
              <label>Vardas</label>
              <input type="text" className="Input__disabled" value="Vardenis" disabled/>
            </div>
            <div>
              <label>Pavardė</label>
              <input type="text" className="Input__disabled" value="Pavardenis" disabled />
            </div>
            <div>
              <label>Gimimo data</label>
              <input type="text" className="Input__disabled" value='2000-10-20' disabled />
            </div>
            <div>
              <label>Lytis</label>
              <select>
                <option>Vyras</option>
                <option>Moteris</option>
                <option>Kita</option>
              </select>
            </div>
            <div>
              <label>Marškinėlių dydis</label>
              <select>
                <option>Extra Small (XS)</option>
                <option>Small (S)</option>
                <option>Medium (M)</option>
                <option>Large (L)</option>
                <option>Extra Large (XL)</option>
              </select>
            </div>
            <div>
              <label>Asmens kodas</label>
              <input className="Input__disabled" type="text" value='5XXXXXX1234' disabled/>
            </div>
            <div className="Container__profile_bio">
              <label>Bio</label>
              <textarea className="Input__bio" placeholder="Jūsų bio..."/>
            </div>
          </div>
            
          <div className="Container__separator"></div>
          <div className="Container__profile_edit_header">
            <h2>Kontaktai</h2>
          </div>
          <div className="Container__profile_form">
            <div>
              <label>Asmeninis el. paštas</label>
              <input type="text" className="Input__active" value='v.pavardenis@gmail.com'/>
            </div>
            <div>
              <label>Telefono nr.</label>
              <input type="text" className="Input__active" value='+37061234567'/>
            </div>
            <div>
              <label>Adresas</label>
              <input type="text" className="Input__active" value='Taikos pr. XX-XX' />
            </div>
            <div>
              <label>Automobilio numeris</label>
              <input type="text" className="Input__active" value='LYV330' placeholder="XXXYYY" />
            </div>
            <div>
              <label>GitHub <FontAwesomeIcon id="linkedin" className="Icon__social" icon={faGithub} /> </label>
              <input type="text" className="Input__active" value='https://github.com/arnas78' placeholder="https://github.com/profileName" />
            </div>
            <div>
              <label>Linkedin  <FontAwesomeIcon id="linkedin" className="Icon__social" icon={faLinkedinIn} /> </label>
              <input type="text" className="Input__active" value='https://linkedin.com/arnas78' placeholder="https://linkedin.com/profileName" />
            </div>
          </div>

          <div className="Container__separator"></div>
          <div className="Container__profile_edit_header">
            <h2>Banko informacija</h2>
          </div>
          <div className="Container__profile_form">
            <div>
              <label>Banko pavadinimas</label>
              <input type="text" className="Input__active" value='Swedbank'/>
            </div>
            <div>
              <label>Banko sąskaitos nr.</label>
              <input type="text" className="Input__active" value='XX1234YYYY4567XXXX89'/>
            </div>
          </div>

 
        </div>

      </div>
    </div>
  );
};

export default Profile;
