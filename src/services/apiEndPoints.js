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