import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";
import {Subscription} from "rxjs";
import * as d3 from "d3";
import {Vert} from "../../../utils";

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: GraphNode;
  target: GraphNode;
  nb: number;

}

@Component({
  selector: 'app-graph-cheminement-appel',
  templateUrl: './graph-cheminement-appel.component.html',
  styleUrls: ['./graph-cheminement-appel.component.css']
})
export class GraphCheminementAppelComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  arbre: string[][];
  labels: string[];

  height = 800;
  width = 1000;

  nodes: GraphNode[] = [{id:"1"}];
  links: GraphLink[] = [{source: this.nodes[0], target: this.nodes[0], nb: 1}];

  public dataObservable: Subscription;
  public valeurObservable: Subscription;

  constructor(private data: CaisseRegionaleService, private value: ValeursService, private PostService: PostService) {
    this.arbre = [];
    this.labels = [];

    this.valeurObservable=this.value.current.subscribe(_ => this.getData());
    this.dataObservable=this.data.current.subscribe(_ => this.getData());
  }

  ngAfterViewInit(): void {
    d3.select('#graph').selectAll('svg').remove();

    const svg = d3.select('#graph')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    const simulation = d3.forceSimulation<GraphNode>(this.nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(this.links)
        .id((d) => d.id)
        .distance(50) // set the distance between nodes to 60
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.width/2, this.height/2))
      .force('collision', d3.forceCollide().radius(70))
      .on('tick', () => {
        link
        .attr('x1', (d) => {
            // @ts-ignore
            return d.source.x.toString();
        })
        .attr('y1', (d) => {
            // @ts-ignore
            return d.source.y.toString();
        })
        .attr('x2', (d) => {
            // @ts-ignore
          return d.target.x.toString();
        })
        .attr('y2', (d) => {
            // @ts-ignore
            return d.target.y.toString();
        });

      node
        // @ts-ignore
        .attr('cx', (d) => d.x.toString())
        // @ts-ignore
        .attr('cy', (d) => d.y.toString());
    });

    const link = svg.selectAll('.link')
      .data(this.links)
      .join('line')
      .attr('stroke', Vert)
      .attr('stroke-opacity', 0.8)
      .attr('stroke-width', (d) => d.nb/150 +3)
      .attr('stroke-linecap', 'round')
      .attr("marker-end", (d) => "url(#arrowhead)");

    // Define marker
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 0 5 5")
      .attr("refX", 5)
      .attr("refY", 2.5)
      .attr("markerWidth", 3)
      .attr("markerHeight", 3)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 5 2.5 L 0 5 z") // define the shape of the marker
      .attr("fill", Vert);


    const node = svg.selectAll('.node')
      .data(this.nodes)
      .join('circle')
      .attr('class', 'node')
      .attr('r', 6)
      .attr('fill', 'black')
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(): void {
    // TODO : à implémenter
    console.log("arbre and labels")
    console.log(this.arbre);
    console.log(this.labels);
    this.nodes = [];
    this.links = [];
    for(const element of this.labels) {
      this.nodes.push({id: element});
    }
    for(const element of this.arbre) {
      this.links.push({
        source: this.nodes[this.getIdNode(element[0])],
        target: this.nodes[this.getIdNode(element[1])],
        nb: parseInt(element[2])});
    }
    console.log("parse node and link")
    console.log(this.nodes);
    console.log(this.links);
    this.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    this.dataObservable.unsubscribe();
    this.valeurObservable.unsubscribe();
  }


  getData() {
    this.PostService.postCheminementAppel().subscribe(data => {
      this.arbre = data.edges;
      this.labels = data.nodes;
      this.ngOnChanges();
    });
  }

  getIdNode(label: string): number {
    for(let i = 0; i < this.nodes.length; i++) {
      if(this.nodes[i].id === label) {
        return i;
      }
    }
    return -1;
  }
}
