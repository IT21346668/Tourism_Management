const router = require("express").Router();
const { Router } = require("express");
let vehicle = require("../models/vehicle");

router.route("/add").post((req,res) => {

    const userName = req.body.userName;
    const userPhone = Number(req.body.userPhone);
    const vehicleName = req.body.vehicleName;
    const pick_up_place = req.body.pick_up_place;
    const [dateString1, timeString1] = req.body.start.split('T');
    const [dateString2, timeString2] = req.body.end.split('T');
    const [year1, month1, day1] = dateString1.split('-');
    const [hours1, minutes1, seconds1] = timeString1.split(':');
    const start= new Date(year1, month1-1, day1, hours1, minutes1);
    const [year2, month2, day2] = dateString2.split('-');
    const [hours2, minutes2, seconds2] = timeString2.split(':');
    const end = new Date(year2, month2-1, day2, hours2, minutes2);
    const destination_place = req.body.destination_place;
    const distance = Number(req.body.distance);
    const driverName = req.body.driverName;
    const licenNo = Number(req.body.licenNo);
    const vehicleNum = req.body.licenNo;


    const newVehicle = new vehicle({

        userName,
        userPhone,
        vehicleName,
        pick_up_place,
        start,
        end,
        destination_place,
        distance,
        driverName,
        licenNo,
        vehicleNum

    })
    
    newVehicle.save().then(() =>{
        res.json("User Added")
    }).catch((err) =>{
        console.log(err);
    })
})

router.route("/get").get((req,res) =>{

    vehicle.find().then((Vehicles) =>{
        res.json(Vehicles)
    }).catch((err) =>{
        console.log(err)
    })
})


router.put('/update/:id',(req,res)=>{
    vehicle.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

router.route("/delete/:id").delete(async (req,res) =>{
    let userId = req.params.id;
    await vehicle.findByIdAndDelete(userId).then(() =>{
        res.status(200).send({status: "user deleted"});
    }).catch((err) =>{
        console.log("err.message");
        res.status(500).send({status: "Error with deleting data", error: err.message});
    })
})

router.route("/:id").get(async(req, res) => {
    let userId = req.params.id;
    const user = await vehicle.findById(userId)
    .then((vehicle) =>{
        res.status(200).send({status: "user fetched", vehicle})
    }).catch((err) =>{
        console.log("err.message");
        res.status(500).send({status: "Error with fetched data", error: err.message});
    })
})

module.exports = router;