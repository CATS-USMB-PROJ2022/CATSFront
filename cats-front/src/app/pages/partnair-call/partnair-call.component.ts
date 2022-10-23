import { Component, OnInit } from '@angular/core';
import {NgxGraphModule, Edge, Node, ClusterNode, Layout} from '@swimlane/ngx-graph';

var links: Edge[] = [
{id: 'a',source: '1',target: '2',label: 'transfer vers'},
 {id: 'b',source: '2',target: '3',label: 'transfer vers'},
  {id: 'c',source: '3',target: '4',label: 'transfer vers'},
  {id: 'd',source: '4',target: '5',label: 'transfer vers'}]
var nodes: Node[] = [{id: '1',label: "ga_00881"}, 
{id: '2',label: "ga_00881_00473"}, 
{id: '3',label: "ga_00881_00839_c03"},
{id:'4', label:"ga_00881_00839" } ,
{id: '5',label:"ga_centre"}]

@Component({
  selector: 'app-partnair-call',
  templateUrl: './partnair-call.component.html',
  styleUrls: ['./partnair-call.component.css']
})

export class PartnairCallComponent implements OnInit {
  nodes: Node[] = nodes;
  links: Edge[] = links;
  constructor() { 
  }
  
  ngOnInit(): void {

  }

}
