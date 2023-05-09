import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";
import {Subscription} from "rxjs";
import * as d3 from "d3";
import {SimulationNodeDatum, text} from 'd3';
import {Rouge, Vert} from "../../../utils";


interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  nb: number;
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
  labels: any[];

  width: number = 1000;
  height: number = 1000;

  nbMaxAppel: number = 0;

  nodes: GraphNode[] = [{id: "1", nb: 1}];
  links: GraphLink[] = [{source: this.nodes[0], target: this.nodes[0], nb: 1}];

  public dataObservable: Subscription;
  public valeurObservable: Subscription;

  constructor(private data: CaisseRegionaleService, private value: ValeursService, private PostService: PostService) {
    this.arbre = [];
    this.labels = [["", 0]];

    this.valeurObservable = this.value.current.subscribe(_ => this.getData());
    this.dataObservable = this.data.current.subscribe(_ => this.getData());
  }

  ngAfterViewInit(): void {
    const container = document.getElementById('graph');
    if (container != null) {
      this.width = container.clientWidth;
      this.height = container.clientHeight;
    }

    const circle_size : number = this.getTailleIdNode()*5;

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
      .attr("viewBox", "0 0 1000 1000")
      .attr("refX", 500)
      .attr("refY", 500)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M220.7 500c0-17.6 6.7-35.1 20.1-48.5L662.2 30.1c26.8-26.8 70.3-26.8 97.1 0c26.8 26.8 26.8 70.2 0 97.1L386.4 500l372.8 372.9c26.8 26.8 26.8 70.3 0 97c-26.8 26.8-70.2 26.8-97 0L240.8 548.5C227.4 535.1 220.7 517.6 220.7 500z") // define the shape of the marker
      .attr("fill", "black")
      .attr("transform", "rotate(180, 500, 500)");

    // define the simulation and its forces
    const simulation = d3.forceSimulation<GraphNode>(this.nodes)
      .nodes(this.nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(this.links)
        .id((d) => d.id)
        .distance(circle_size*2) // set the distance between nodes to 60
        .strength(0.2)
      )
      .force('link-distance', d3.forceLink<GraphNode, GraphLink>(this.links)
        .id((d) => d.id)
        .links(this.links)
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.width / 2, this.height / 2)) // center the graph in the middle of the screen
      .force('collision', d3.forceCollide().radius(circle_size *2)) // avoid collision between nodes
      // force the graph to stay within its boundaries
      .force('x', d3.forceX(this.width / 2).strength(0.3))
      .force('y', d3.forceY(this.height / 2).strength(0.3))
      .on('tick', () => {
        node
          .attr('cx', (d) => Math.max(circle_size, Math.min(this.width - circle_size, d.x as number)))
          .attr('cy', (d) => Math.max(circle_size, Math.min(this.height - circle_size, d.y as number)))
          .attr('transform', d => `translate(${d.x},${d.y})`) // set the position of the group;
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
            const dx = d.target.x - d.source.x;
            // @ts-ignore
            const dy = d.target.y - d.source.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const unitDx = dx / distance;
            // @ts-ignore
            return d.target.x - unitDx * (circle_size  + 5 + (d.nb/this.nbMaxAppel)*15);
          })
          .attr('y2', (d) => {
            // @ts-ignore
            const dx = d.target.x - d.source.x;
            // @ts-ignore
            const dy = d.target.y - d.source.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const unitDy = dy / distance;
            // @ts-ignore
            return d.target.y - unitDy * (circle_size + 5 + (d.nb/this.nbMaxAppel)*15);
          })
      });


    // drag behavior handler
    function dragStarted(event: any, d: SimulationNodeDatum) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: SimulationNodeDatum) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event: any, d: SimulationNodeDatum) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = event.x;
      d.fy = event.y;
    }

    const drag = (<any>d3).drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded);

    // create the links
    const link = svg.selectAll('.link')
      .data(this.links)
      .enter()
      .append('line')
      .attr('class', 'links')
      .attr('stroke', (d) => { if(d.nb/this.nbMaxAppel > 0.5) return Vert; else return Rouge; })
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d) => ((d.nb / this.nbMaxAppel)*15 +3))
      .attr('stroke-linecap', 'round')
      .attr("marker-end", (d) => "url(#arrowhead)");

    link.append("title")
      .text((d)=> d.nb + " appel(s) de " + d.source.id + " à " + d.target.id + " : " + ((d.nb/d.source.nb)*100).toFixed(2) + "%");

    // create the nodes
    const node = svg.selectAll('.nodes')
      .data(this.nodes)
      .enter()
      .append('g')
      .call(drag);
    node.append('circle')
      .attr('r', circle_size)
      .attr('fill', (d) => { if(d.nb/this.nbMaxAppel > 0.5) return "#80c380"; else return "lightgrey"; })
      .attr('stroke', "black");

    node.append('title')
      .text((d) => d.id + " : " + d.nb + " appel(s)");

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)// to correctly center the text
      .text((d) => d.id);

    // Define the fixed node's position
    const fixedNodeX = circle_size + 10; // Adjust the values as needed
    const fixedNodeY = circle_size + 10; // Adjust the values as needed

// Find the node you want to fix
    const fixedNode = this.nodes.find((node) => node.id === this.labels[0][0]);

// If the fixed node is found, set its position and disable the forces
    if (fixedNode) {
      fixedNode.fx = fixedNodeX;
      fixedNode.fy = fixedNodeY;
      fixedNode.vx = 0;
      fixedNode.vy = 0;
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(): void {
    this.nodes = [];
    this.links = [];
    for (const element of this.labels) {
      this.nodes.push({id: element[0], nb: element[1]});
    }
    for (const element of this.arbre) {
      this.links.push({
        source: this.nodes[this.getIdNode(element[0])],
        target: this.nodes[this.getIdNode(element[1])],
        nb: parseInt(element[2])
      });
    }
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
      this.nbMaxAppel = this.getNbAppelMax();
      this.ngOnChanges();
    });
  }

  getIdNode(label: string): number {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].id === label) {
        return i;
      }
    }
    return -1;
  }

  getNbAppelMax(): number {
    let max = 0;
    for (const element of this.arbre) {
      if (parseInt(element[2]) > max) {
        max = parseInt(element[2]);
      }
    }
    return max;
  }

  getTailleIdNode(): number {
    let max:string = "";
    for(const element of this.nodes) {
      if(element.id.length > max.length) {
        max = element.id;
      }
    }
    return max.length;
  }
}


