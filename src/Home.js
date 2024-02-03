import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import "./App.css";

import { useDispatch } from "react-redux";
import { getstudentsList } from "./Action";
import FormInput from "./components/FormInput/FormInput";

function Home() {
  // const dispatch = useDispatch()
  /*        States   */

  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState(0);
  const [studentData, setStudentData] = useState(0);
  const [currentdata, setCurrentData] = useState(0);
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    email: "",
    classNo: "",
    dob: "",
    phoneNo: "",
  });
  // --------------

  const style = {
    display: "flex",
    position: "absolute",
    top: "0",
    right: "0",
    height: "100%",
    width: 360,
    bgcolor: "background.paper",
    p: 4,
  };

  useEffect(() => {
    axios.get("http://localhost:8081/").then((response) => {
      //console.log("response,", response);
      const updatedFormDataArray = response.data
        ? response.data.map((el, key) => ({
            slNo: key + 1,
            student_id: el.student_id,
            name: el.name,
            rollNo: el.roll_No,
            email: el.email,
            classNo: el.class,
            division: el.division,
            dob: el.f_dob,
          }))
        : [];
      setStudentData(updatedFormDataArray);
    });
  }, []);

  const columns = [
    {
      name: "slNo",
      label: "SL . No",
      options: {
        align: "center",
        filter: false,
        sort: false,
      },
    },

    {
      name: "name",
      label: "name",
      align: "center",
      options: {
        align: "center",
        filter: true,
        sort: true,
      },
    },
    {
      name: "rollNo",
      label: "roll_No",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "email",
      options: {
        align: "center",
        filter: true,
        sort: true,
      },
    },
    {
      name: "classNo",
      label: "class",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "division",
      label: "division",
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   name: "dob",
    //   label: "Date of Birth",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    // {
    //   name: "division",
    //   label: "division",
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    {
      name: "student_id",
      label: "ACTION",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id, data) => {
          return (
            <button
              className="btn"
              onClick={() => {
                onEdit(id, data);
              }}
            >
              ✎
            </button>
          );
        },
      },
    },
    {
      name: "student_id",
      label: " ",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (id, tableMeta) => {
          return (
            <button
              className="delete-btn formButtonCancel"
              onClick={() => onDelete(id)}
            >
              🗑️
            </button>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
    customToolbar: () => {
      return (
        <button className="btn" onClick={onAddNew}>
          + Add
        </button>
      );
    },
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Student name",
      errorMessage: "name should be 3-16 characters",
      label: "Student name",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Try a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "rollNo",
      type: "number",
      placeholder: "Roll no",
      errorMessage: " !",
      label: "Roll No",
      required: true,
    },
    {
      id: 4,
      name: "classNo",
      type: "number",
      placeholder: "class",
      errorMessage: " !",
      label: "class",
      required: true,
    },
    // {
    //   id: 5,
    //   name: "division",
    //   type: "text",
    //   placeholder: "division",
    //   errorMessage: " !",
    //   label: "division",
    //   // required: true,
    // },
    // {
    //   id: 6,
    //   name: "dob",
    //   type: "date",
    //   placeholder: "Birthday",
    //   label: "Birthday",
    // },
    // {
    //   id: 7,
    //   name: "phone",
    //   type: "tel",
    //   placeholder: "phn number",
    //   errorMessage: "enter a valid number",
    //   label: "Phone Number",
    //   // pattern: `^\d{10}$`,
    //   required: true,
    // },
  ];

  //
  const handleClose = () => {
    setToggle(false);
    clear();
  };

  const clear = () => {
    setId(0);
    setCurrentData({
      rollNo: "",
      name: "",
      email: "",
      classNo: "",
      dob: "",
      phoneNo: "",
    });
  };
  const handleOnSubmit = (e) => {
    //console.log("ssssssssss:", id);
    if (id < 1) {
      axios
        .post("http://localhost:8081/create", formData)
        .then((res) => {
          //console.log("res", res.data);
          setToggle(false);
        })
        .catch((err) => alert(err));
    } else {
      formData["id"] = id;
      axios
        .put("http://localhost:8081/update", formData)
        .then((res) => {
          //console.log("res", res.data);
          setToggle(false);
        })
        .catch((err) => alert(err))
        .finally(clear());
    }
  };
  const onEdit = (id, data) => {
    console.log(id, data.rowData, "eeeeeeeeeee");
    setFormData({
      name: data["rowData"][1],
      rollNo: data["rowData"][2],
      email: data["rowData"][3],
      classNo: data["rowData"][4],
      division: data["rowData"][4],
      dob: data["rowData"][6],
      // phoneNo: data["rowData"][5],
    });

    setId(id);
    setToggle(true);
    const edata = studentData.find((el) => (el.student_id == id ? el : null));
    setCurrentData(edata);
  };
  const onAddNew = (e) => {
    setToggle(true);
  };

  const onDelete = (id) => {
    axios
      .put("http://localhost:8081/delete", { id })
      .then((res) => {
        //console.log(res.data);
        // axios.get("http://localhost:8081/").then((response) => {
        //   //console.log(response.data);
        //   setStudentDetails(response.data);
        // });
      })
      .catch((err) => {
        //console.error(err);
        alert("An error occurred while deleting the record.");
      })
      .finally(() => {
        window.location.reload();
      });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setCurrentData({ ...formData, [e.target.name]: e.target.value });
  };
  //console.log("formData", formData);
  return (
    <div>
      <MUIDataTable
        title={"Student Details"}
        columns={columns}
        data={studentData[0] ? studentData : []}
        options={options}
      />

      <Modal open={toggle} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleOnSubmit}>
            <h1>Register</h1>
            {inputs.map((input, key) => (
              <FormInput
                key={input.id}
                {...input}
                value={currentdata[input["name"]]}
                onChange={onChange}
              />
            ))}
            <button className="formButton">Submit</button>
            <button className="formButtonCancel" onClick={handleClose}>
              Cancel
            </button>
          </form>
          {/* <form onSubmit={handleOnSubmit}>
            <label>Roll_No : </label>
            <input
              name="Roll_No"
              type="number"
              min="1"
              // abcd@123
              required
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            ></input>
            <br />
            <label>Name : </label>
            <input
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
            <br />
            <label>Email : </label>
            <input
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              required
            ></input>
            <br />
            <label>Class : </label>
            <input
              name="Class"
              value={classNo}
              onChange={(e) => setClassNo(e.target.value)}
              required
            ></input>
            <br />
            <label>division : </label>
            <input
              name="division"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              required
            ></input>
            <br />
            <button>Submit</button>
            <button>Cancel</button>
          </form> */}
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
