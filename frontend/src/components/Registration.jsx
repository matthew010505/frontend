import React from "react";
import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./styles.css";

const Registration = () => {
  const [name, setName] = useState();
  const [eid, setEid] = useState();
  const [email, setEmail] = useState();
  const [mobileno, setMobileno] = useState();
  const [department, setDepartment] = useState();
  const [doj, setDoj] = useState();
  const [role, setRole] = useState();

  const departments = [
    "marketing",
    "purchase",
    "sales",
    "analysis",
    "customer-relation",
  ];

  const [errors, setErrors] = useState({});

  const handleReset = () => {
    setName("");
    setDepartment("");
    setDoj("");
    setEid("");
    setMobileno("");
    setRole("");
    setErrors({});
    setEmail("");
  };

  const handleSubmit = async (e) => {
    let lst = {};
    if (!name) lst.name = "Name is Required";
    if (!eid) lst.eid = "Employee id is Required";
    if (!email) lst.email = "Email is Required";
    if (!mobileno || !mobileno.match(/^\d{10}$/)) {
      lst.mobileno = "Number must be exactly 10 digits";
    }
    if (!department) lst.department = "Department is required";
    if (!doj) lst.doj = "Date of Joining is required";
    if (!role) lst.role = "Role is required";

    setErrors(lst);

    if (Object.keys(lst).length === 0) {
      try {
        const res = await axios.post("http://localhost:8080/register", {
          name,
          eid,
          email,
          mobileno,
          department,
          doj,
          role,
        });
        toast.success("Employee registered Successfully", {
          position: "top-right",
        });
        console.log("Registration Successful");
        handleReset();
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 400) {
            if (data.message === "exist-id") {
              toast.warning("Employee ID already exists", {
                position: "top-right",
              });
              console.log("Employee ID already exists");
            } else if (data.message === "exist-email") {
              toast.warning("Email ID already exists", {
                position: "top-right",
              });
              console.log("Email ID already exists");
            } else {
              toast.error("Validation error occurred", {
                position: "top-right",
              });
            }
          } else {
            toast.error("Unknown error occurred", { position: "top-right" });
          }
        } else {
          toast.error("Error in registration, Try again later", {
            position: "top-right",
          });
          console.error("Unexpected error: ", error.message);
        }
      }
    }
  };

  return (
    <div>
      <h1 className="header">Employee Details</h1>
      <input
        placeholder="Enter Name"
        type="text"
        value={name}
        className="input-field"
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <p>{errors.name}</p>}

      <input
        placeholder="Enter Employee id"
        type="text"
        value={eid}
        className="input-field"
        onChange={(e) => setEid(e.target.value)}
      />
      {errors.eid && <p>{errors.eid}</p>}

      <input
        placeholder="Enter Email"
        type="email"
        value={email}
        className="input-field"
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        placeholder="Enter Phone Number"
        type="text"
        value={mobileno}
        className="input-field"
        onChange={(e) => setMobileno(e.target.value)}
      />
      {errors.mobileno && <p>{errors.mobileno}</p>}

      <label>Department</label>
      <select
        className=""
        name="department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="" disabled>
          Select Department
        </option>
        {departments.map((dept, index) => (
          <option key={index} value={dept}>
            {dept}
          </option>
        ))}
      </select>
      {errors.department && <p>{errors.department}</p>}

      <label>Date of Joining</label>
      <input
        placeholder="Date of Joining"
        type="date"
        className="input-field"
        value={doj}
        onChange={(e) => setDoj(e.target.value)}
      />
      {errors.doj && <p>{errors.doj}</p>}

      <input
        placeholder="Enter Role"
        type="text"
        value={role}
        className="input-field"
        onChange={(e) => setRole(e.target.value)}
      />
      {errors.role && <p>{errors.role}</p>}

      <div className="button-container">
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Registration;
