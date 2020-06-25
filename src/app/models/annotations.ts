export class Annotations {
    doc_id: number;
    annotations: Array<Annotion>;
    
  }

export class Annotion {
  type: string;
  offset: Offset;
}

export class Offset {
  start_char: number;
  end_char:number;
}