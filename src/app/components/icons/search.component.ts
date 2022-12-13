import {Component} from "@angular/core";

@Component({
  selector: 'search',
  template: `
      <svg xmlns="http://www.w3.org/2000/svg" style="{{style}}" viewBox="0 0 512 512">
          <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/>
      </svg>
  `
})
export class SearchComponent {
  filter = 'invert(56%) sepia(71%) saturate(6609%) hue-rotate(161deg) brightness(97%) contrast(101%)';

  style = {
    height: '26px',
    padding: '7px 8px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'space-between',
    fontWeight: '300'
  };
}
