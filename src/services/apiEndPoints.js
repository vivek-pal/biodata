// PDF file upload	fileService	http://localhost/profile/v1/file/upload	POST	{cid:""} & token &attach
// image upload	fileService	http://localhost/profile/v1/img/upload	POST	{cid:"",pid:""} & token &attach
// retrieve PDF file	fileService	http://localhost/profile/v1/file/download/{cid}/{pid}/{fileid}	GET	/{cid}/{pid}/{fileid}
// retrieve images	fileService	http://localhost/profile/v1/img/download{cid}/{pid}/{imgid}	GET	/{cid}/{pid}/{imgid}
// getMasterData	fileService	http://localhost/profile/v1/temp/{template}	GET	profile/preference/tnc/contact/payment/price

// retrieve profile	profileService	http://localhost/profile/v1/profile	GET	/{cid}/{pid} &token
// Update/add Profile	profileService	http://localhost/profile/v1/profile	PUT	{mobile:'',cid:'',pid:'',profile:""}
// Get Preferences	profileService	http://localhost/profile/v1/profile/preferences	Get	/{cid}/{pid} &token
// Update/add preferences	profileService	http://localhost/profile/v1/profile/preferences	PUT	/{cid}/{pid} &token

// Rag based chatting	llmService	http://localhost/llm/v1/chat/rag	POST	{cid:"",pid:"",message:"", lmessage:""}
// normal chatting	llmService	http://localhost/llm/v1/chat/	POST	{cid:"",pid:"",message:"", lmessage:""}

const endpoints = {
  pdfFileUploadService: {
    method: "post",
    URI: "profile/v1/file/upload",
    // {cid:""} & token &attach
  },
  imageUpload: {
    method: "post",
    URI: "profile/v1/img/upload",
    // {cid:"",pid:""} & token &attach
  },
  retrievePDF: {
    method: "get",
    URI: "/profile/v1/file/download/{cid}/{pid}/{fileid}",
    // /{cid}/{pid}/{fileid}
  },
  retrieveImages: {
    method: "get",
    URI: "/profile/v1/img/download/{cid}/{pid}/{imgid}",
    // /{cid}/{pid}/{imgid}
  },
  getMasterData: {
    method: "get",
    URI: "/profile/v1/temp/{template}",
    // /{cid}/{pid}/{imgid}
  },
  retrieveProfile: {
    method: "get",
    URI: "/profile/v1/profile",
    // /{cid}/{pid} &token
  },
  updateAddProfile: {
    method: "put",
    URI: "/profile/v1/profile",
    // {mobile:'',cid:'',pid:'',profile:""}
  },
  getPreferences: {
    method: "get",
    URI: "/profile/v1/profile/preferences",
    // /{cid}/{pid} &token
  },
  updateAddPreferences: {
    method: "put",
    URI: "/profile/v1/profile/preferences",
    // /{cid}/{pid} &token
  },
  ragBasedChatting: {
    method: "put",
    URI: "/llm/v1/chat/rag",
    // '{cid:"",pid:"",message:"", lmessage:""}',
  },
  normalChatting: {
    method: "put",
    URI: "/llm/v1/chat/",
    //  '{cid:"",pid:"",message:"", lmessage:""}',
  },
};

export default endpoints;