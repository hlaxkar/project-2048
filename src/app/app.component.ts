import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
ngOnInit(){
  this.setTwo();
  this.setTwo();
}
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.up()
        break;
      case 'ArrowDown':
        this.down()
        break;
      case 'ArrowLeft':
        this.left()
        break;
      case 'ArrowRight':
        this.right()
        break;
      default:
        break;
    }
  }
tweet={
  body:'here is some text...',
  isLiked: false,
  likeCount:0
}
liked(){
  this.tweet.isLiked=!this.tweet.isLiked;
  this.tweet.likeCount += (this.tweet.isLiked ? 1 : -1);
  
}
  title = 'project-2048';
  board = {
    rows: 4,
    cols: 4,
    score: 0,
    bestscore:0,
    tiles: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]],
      prev: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
  };



restart(){

 this.board.tiles=[
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]];
  this.board.score=0;
  this.board.prev=[
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]];

    this.setTwo();
    this.setTwo();
}
  findempty() {
    for (let r = 0; r < this.board.rows; r++) {
      for (let c = 0; c < this.board.cols; c++) {
        if (this.board.tiles[r][c] == 0) {
          return true
        }
      }
    }
    return false
  }
  setTwo() {   
    if (!this.findempty()) {
      console.log('Game Over');
      return
    }
    let found: Boolean = false
    let col = 0
    let row = 0
    while (!found) {
      row = Math.floor(Math.random() * this.board.rows);
      col = Math.floor(Math.random() * this.board.cols);
      if (this.board.tiles[row][col] == 0) {
        found = true
      }
    }
    const value = Math.random() < 0.9 ? 2 : 4;
    this.board.tiles[row][col] = value;
  };

  filterZero(row: any[]) {
    return row.filter((num: number) => num != 0); //return a new array without zeros
  }
  slide(row: number[]): any {
    //filter out the zeros
    row = this.filterZero(row)

    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] == row[i + 1]) {
        row[i] = row[i] * 2;
        this.board.score += row[i];
        if(this.board.score>this.board.bestscore)this.board.bestscore=this.board.score
        row[i + 1] = 0;
      }
      row = this.filterZero(row)

    }

    while (row.length < this.board.cols) {
      row.push(0);
    }
    return row

  }
  slideLeft() {
    for (let r = 0; r < this.board.rows; r++) {
      this.board.tiles[r] = this.slide(this.board.tiles[r]);

    }
  }
  slideRight(){
    
    for (let r = 0; r < this.board.rows; r++) {
    
      this.board.tiles[r] = this.slide(this.board.tiles[r].reverse()).reverse();

    }
  }

  slideUp(){
    for(let c=0;c<this.board.cols;c++){

    let row= [this.board.tiles[0][c],this.board.tiles[1][c],this.board.tiles[2][c],this.board.tiles[3][c]]
    let newrow=this.slide(row);
    //console.log(newrow);
    
   this.board.tiles[0][c]=newrow[0];
   this.board.tiles[1][c]=newrow[1];
   this.board.tiles[2][c]=newrow[2];
   this.board.tiles[3][c]=newrow[3];
  }
  
}
updateprev(){
  console.log('before update',this.board.prev);
  
  this.board.prev=JSON.parse(JSON.stringify(this.board.tiles));
  console.log('after update',this.board.prev);

}

slideDown(){
  for(let c=0;c<this.board.cols;c++){

    let row= [this.board.tiles[0][c],this.board.tiles[1][c],this.board.tiles[2][c],this.board.tiles[3][c]]
    row=this.slide(row.reverse()).reverse();
    //console.log(newrow);
    
   this.board.tiles[0][c]=row[0];
   this.board.tiles[1][c]=row[1];
   this.board.tiles[2][c]=row[2];
   this.board.tiles[3][c]=row[3];
  }
  
}

  up(){ this.updateprev(); this.slideUp(); this.setTwo() }
  down(){ this.updateprev();this.slideDown(); this.setTwo() }
  left(){ this.updateprev(); this.slideLeft(); this.setTwo() }
  right(){  this.updateprev();this.slideRight();this.setTwo() }



  undo(){ this.board.tiles=JSON.parse(JSON.stringify(this.board.prev));
  }
}

