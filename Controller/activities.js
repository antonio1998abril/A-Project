const Act = require ("../Models/activities");
const User = require("../Models/user")

const controller = {
    getAct : async  (req, res, next) => {
        await Act.find({ collaborator_id:req.params.id}).then(activities => {
            const doneact = [];
            const pending = [];
            for (i = 0; i < activities.length; i++){
                if(activities[i].statusDone === true){
                    doneact.push(activities[i])
                } else {
                pending.push(activities[i])
                } 
            } 
            res.json({
                activities:pending,
                doneAct:doneact
            })
        }).catch(next)
    },
    postAct : async(req,res,next) => {
        const {description,observable, subject,dateToComplete, collaborator_id} = req.body;
        if(!description || !observable || ! subject || !dateToComplete || !collaborator_id) return res.status(302).json({msg:"Complete all fields"})

        const newActivitiy = new Act({
            description:description,
            observable:observable,
            subject: subject,
            dateToComplete:dateToComplete,
            collaborator_id:collaborator_id
        })
        await newActivitiy.save().then(()=> {
            return res.json({msg:"New activity added"})
        }).catch(next)
    },
    updateAct: async(req,res,next) => {
        const  {description,observable, subject,dateToComplete, collaborator_id} = req.body
        await Act.findByIdAndUpdate({_id:req.params.id},{ description,observable, subject,dateToComplete, collaborator_id}).then(()=>{
            return res.json({msg:"Actividad updated"})
        }).catch(next)
    },
    deleteAct: async (req,res,next) => {
       /* delete eactivities logic and not fisical */
        await Act.findByIdAndRemove({_id:req.params.id}).then(async()=>{
            /* await User.findOneAndUpdate({Activities:req.params.id},{ $pull: {Activities:req.params.id } })  */
            return res.json({msg:"activity deleted"})
        }).catch(next) 
    },
    DoneAct: async(req,res,next) =>{
        await Act.findByIdAndUpdate({_id:req.params.id},{StatusDone:true}).then(()=>{
            return res.json({msg:"Activdad Hecha"})
        })
    },
    Backoff: async(req, res, next) =>{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();

        today =  yyyy + '-' + mm + '-' + dd;
       
        await Act.findByIdAndUpdate({_id:req.params.id},{dateToComplete:today,Status:false}).then(()=>{
            return res.json({msg:"activity returned"})
        })
    }
}

module.exports = controller