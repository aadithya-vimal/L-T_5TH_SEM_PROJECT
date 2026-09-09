const Notification=require('../models/Notification');const ApiError=require('../utils/ApiError');
exports.list=async(req,res)=>res.json({success:true,message:'Notifications loaded',data:await Notification.find({userId:req.user._id}).sort({createdAt:-1}).limit(100)});
exports.read=async(req,res)=>{const n=await Notification.findOneAndUpdate({_id:req.params.id,userId:req.user._id},{isRead:true},{new:true});if(!n)throw new ApiError(404,'Notification not found','NOT_FOUND');res.json({success:true,message:'Notification marked as read',data:n});};
exports.readAll=async(req,res)=>{await Notification.updateMany({userId:req.user._id,isRead:false},{isRead:true});res.json({success:true,message:'Notifications marked as read',data:null});};
