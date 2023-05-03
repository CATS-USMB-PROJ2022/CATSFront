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

  width: number = 1000;
  height: number = 1000;

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
    const container = document.getElementById('graph');
    if(container != null) {
      this.width = container.clientWidth;
      this.height = container.clientHeight;
    }

    // delete previous generated graph
    d3.select('#graph').selectAll('svg').remove();

    // create svg
    const svg = d3.select('#graph')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(0,0)');

    // Define marker arrow
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

    // define the simulation and its forces
    d3.forceSimulation<GraphNode>(this.nodes)
      .nodes(this.nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(this.links)
        .id((d) => d.id)
        .distance(70) // set the distance between nodes to 60
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.width/2, this.height/2)) // center the graph in the middle of the screen
      .force('collision', d3.forceCollide().radius(60)) // avoid collision between nodes
      // force the graph to stay within its boundaries
      .force('x', d3.forceX(this.width / 2).strength(0.3))
      .force('y', d3.forceY(this.height / 2).strength(0.3))
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
            return d.target.x - 35 * Math.cos(Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x)).toString();
          })
          .attr('y2', (d) => {
            // @ts-ignore
            return d.target.y - 35 * Math.sin(Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x)).toString();
          })
      node
        .attr('transform', d => `translate(${d.x},${d.y})`); // set the position of the group
    });

    // create the links
    const link = svg.selectAll('.link')
      .data(this.links)
      .enter()
      .append('line')
      .attr('class', 'links')
      .attr('stroke', Vert)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d) => d.nb/150 +2)
      .attr('stroke-linecap', 'round')
      .attr("marker-end", (d) => "url(#arrowhead)");

    link.append("title")
      .text((d) => d.nb);

    // create the nodes
    const node = svg.selectAll('.nodes')
      .data(this.nodes)
      .enter()
      .append('g') ;

    node.append('circle')
      .attr('r', 35)
      .attr('fill', '#e6e6e6')
      .attr('stroke', "black");

    node.append('title')
      .text((d) => d.id);

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)// to correctly center the text
      .text((d) => d.id);
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(): void {
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


