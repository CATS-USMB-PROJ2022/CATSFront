import {Component} from "@angular/core";

@Component({
  selector: 'voir-plus',
  template: `
      <svg xmlns="http://www.w3.org/2000/svg" style="{{style}}" viewBox="0 0 390.704 390.704" fill="#009aa9"
           version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <path
                        d="M379.711,326.556L265.343,212.188c30.826-54.189,23.166-124.495-23.001-170.663c-55.367-55.366-145.453-55.366-200.818,0 c-55.365,55.366-55.366,145.452,0,200.818c46.167,46.167,116.474,53.827,170.663,23.001l114.367,114.369 c14.655,14.655,38.503,14.654,53.157,0C394.367,365.059,394.368,341.212,379.711,326.556z M214.057,214.059 c-39.77,39.771-104.479,39.771-144.25,0c-39.77-39.77-39.77-104.48,0-144.25c39.771-39.77,104.48-39.77,144.25,0 C253.828,109.579,253.827,174.29,214.057,214.059z">

                </path>
              </g>
            </g>
          </g>
      </svg>
  `
})
export class VoirPlusComponent {
  style = {
    height: '30px',
    padding: '7px 8px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'space-between',
    fontWeight: '300'
  };
}
