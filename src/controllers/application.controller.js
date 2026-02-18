import Application from '../models/application.model.js';

const allApplication = async(req,res)=>{
  const applications = await Application.find();
  return res.status(200).json({message:'all applications', applications});
}

const getOneApplication = async(req,res)=>{
   const {id}= req.params;
   const application = await Application.findById(id);
   if(!application){
    return res.status(404).json({message:'application not found'});
   }
   return res.status(200).json({application});
}

const updateApplication = async(req,res)=>{
    const {id} = req.params;
    const {status} = req.body;
    const application = await Application.findByIdAndUpdate(id,{status:status},{new:true});
    if(!application){
    return res.status(404).json({message:'application not found'});
   }
   return res.status(200).json({message:'application updated', application});

}

const createApplication = async(req,res)=>{
    const {
        userId,
        companyName,
        position,
        status,
        appliedDate,
        followUpDate,
        lastFollowUp,
        notes
    
    } = req.body;
    const application = new Application({
        userId,
        companyName,
        position,
        status,
        appliedDate,
        followUpDate,
        lastFollowUp,
        notes
    });
    await application.save();
    return res.status(201).json({message:'application created', application});

}

const deleteApplication = async(req,res)=>{
    const {id} = req.params;
    const application = await Application.findByIdAndDelete(id);
    if(!application){
        return res.status(404).json({message:'application not found'});
    }
    return res.status(200).json({message:'application deleted'});
    }

    export {allApplication, getOneApplication, updateApplication, createApplication, deleteApplication};

