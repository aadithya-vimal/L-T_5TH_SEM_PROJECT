exports.get=async(req,res)=>res.json({success:true,message:'Profile loaded',data:req.user});
exports.update=async(req,res)=>{const allowed=['name','phone','dateOfBirth','address'];for(const k of allowed)if(req.body[k]!==undefined)req.user[k]=req.body[k];await req.user.save();res.json({success:true,message:'Profile updated',data:req.user});};
