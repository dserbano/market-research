import { HttpClient, HttpRequestMessage, RequestBuilder } from 'aurelia-http-client';
import { autoinject } from 'aurelia-framework';
import { Command, RequestMetaInformation } from './dtos/command';
import * as environment from '../../config/environment.json';


@autoinject()
export class Server
{
    httpClient = new HttpClient();

    private serverURL;

    constructor() { 
      this.serverURL = environment.endpoint;
    }

    public run<T>(cmd: Command, progressCallback : Function = null) : Promise<T> {   

      let queryParams = {};
      let bodyParams = {};
      let formParams = new FormData();

      let requestMetaInformation : RequestMetaInformation = cmd.requestMeta();
            
      for(let key in cmd) {
        if(typeof cmd[key] !== "function") {
          if (requestMetaInformation.queryParams.find(k => key === k)) queryParams[key] = cmd[key];
          if (requestMetaInformation.bodyParams.find(k => key === k)) bodyParams[key] = cmd[key];
          if (requestMetaInformation.formParams.find(k => key === k)) formParams.append(key, cmd[key]);
        }
      }


      let request : RequestBuilder = this.httpClient
      .createRequest(requestMetaInformation.route)
      .withBaseUrl(this.serverURL)
      .withParams(queryParams)
      if (requestMetaInformation.verb == 'GET')
        request = request.asGet();
      if (requestMetaInformation.verb  == 'HEAD')
        request = request.asHead();
      if (requestMetaInformation.verb == 'POST')
        request = request.asPost();
      if (requestMetaInformation.verb  == 'PUT')
        request = request.asPut();
      if (requestMetaInformation.verb  == 'DELETE')
        request = request.asDelete();
      if (requestMetaInformation.verb  == 'OPTIONS')
        request = request.asOptions();
      if (requestMetaInformation.verb == 'PATCH')
        request = request.asPatch();
      if (progressCallback) {
        request = request.withProgressCallback(progress => progressCallback(progress));
      }
      if (Object.keys(bodyParams).length > 0) {
        request = request  
        .withContent(bodyParams);
      } else {
        request = request  
        .withContent(formParams);
      }
      if (!requestMetaInformation.public) request = request.withHeader("Authorization", "Bearer " + "getToken() To Be Implemented...");
      return request
      .send()
      .then((res)=>{
          return JSON.parse(res.response);
      }).catch((reason : HttpRequestMessage) => {
          throw reason;
      });  
    }
        
}
    
  




