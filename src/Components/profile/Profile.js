import React , {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getprofile } from "../../redux/action";
import Roll from 'react-reveal/Roll';


import "./Profile.css";

const Profile = () => {
  const { data } = useSelector((state) => state.profile);
  const vaz = data ? data : false;
  const ala = vaz.message === "logged in" ? vaz : false;
  console.log(vaz);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getprofile());
  }, [dispatch]);

  return (
    <Roll top>
    <div>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src={ala ? ala.user.image : "empty"}
                alt="navid"
              />
              <p>
                {" "}
                {ala && ala.user.firstname ? ala.user.firstname : "empty"}{" "}
              </p>
              <span className="font-weight-bold"> </span>
              <p style={{fontSize:'1.3vw'}}> {ala ? ala.user.email : "empty"} </p>
              <span className="text-black-50"> </span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Details</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">FirstName</label>
                  <p>
                    {ala && ala.user.firstname ? ala.user.firstname : "empty"}
                  </p>
                </div>
                <div className="col-md-6">
                  <label className="labels">LastName</label>
                  <p>
                    {ala && ala.user.lastname ? ala.user.lastname : "empty"}
                  </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Email</label>
                  <p>{ala ? ala.user.email : "empty"} </p>
                  <div className="col-md-12">
                    <label className="labels">Username</label>
                    <p>{ala ? ala.user.username : "empty"}</p>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Mobile</label>
                    <p> {ala ? ala.user.mobile : "empty"} </p>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Gender</label>
                    <p>
                      {" "}
                      {ala && ala.user.gender ? ala.user.gender : "empty"}{" "}
                    </p>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Age</label>
                    <p> {ala && ala.user.age ? ala.user.age : "empty"} </p>
                    <p> </p>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">City</label>
                    <p> {ala && ala.user.city ? ala.user.city : "empty"} </p>
                    <p> </p>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Email ID</label>
                    <p> {ala ? ala.user.email : "empty"} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Roll>
  );
};

export default React.memo(Profile);
