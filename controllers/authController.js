const { register, login } = require('../services/authService');
exports.register = async (req,res)=>{ const r=await register(req.body); res.status(201).json({success:true,message:'Account created successfully',data:{user:r.user,token:r.token}}); };
exports.login = async (req,res)=>{ const r=await login(req.body.email,req.body.password); res.json({success:true,message:'Login successful',data:{user:r.user,token:r.token}}); };
exports.me = async (req,res)=>res.json({success:true,message:'Profile loaded',data:{user:req.user}});
exports.logout = async (_req,res)=>res.json({success:true,message:'Logout successful',data:null});
