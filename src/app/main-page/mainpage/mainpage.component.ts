import { Component, OnInit, AfterViewInit, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit, AfterViewInit {
  private videoElement: HTMLVideoElement;
  private userClicked: boolean = false;
  video: string = "../../../assets/videos/promo.mp4";
  mobile: boolean = false;

  constructor(private elementRef: ElementRef) {
    this.videoElement = this.elementRef.nativeElement.querySelector('#background-video');
    this.setVideoSources(window.innerWidth);
  }


  ngOnInit(): void {

    window.onload = () => {
      this.videoElement = this.elementRef.nativeElement.querySelector('#background-video');
      if (this.videoElement) {


        this.videoElement.play()
          .then(_ => {
            // Autoplay started!
          })
          .catch(error => {
            // Autoplay was prevented.
            // Handle or log the error as needed.
            console.error('Autoplay prevented:', error);
          })

      }
    }
    setTimeout(() => {
      this.triggerClick();
    }, 4000);
  }


  playVideoonloop() {
    const video = document.getElementById('background-video') as HTMLVideoElement;
    video.play();
  }

  triggerClick() {
    // this.userClicked = true;
    this.playVideo();
  }

  @HostListener('click')
  onClick() {
    this.playVideo();
  }

  @HostListener('window:scroll')
  onScroll() {

    const scrollPosition = window.scrollY;
    const triggerPoint = 500; // Adjust this value based on your requirements

    if (scrollPosition > triggerPoint) {
      this.playVideo();
    }
    // }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.setVideoSources(event.target.innerWidth);
  }

  private setVideoSources(windowWidth: number) {
    if (windowWidth >= 768) { // Desktop or larger viewports

      this.mobile = false;
      this.video = "../../../assets/videos/1920x1080.mp4";

    } else { // Mobile viewports
      this.mobile = true;
      this.video = "../../../assets/videos/1080x1920.mp4";
    }
  }

  private playVideo() {
    this.videoElement.play()
      .then(_ => {
        // Autoplay started!
      })
      .catch(error => {
        // Autoplay was prevented.
        // Handle or log the error as needed.
        console.error('Autoplay prevented:', error);
      });
  }


  ngAfterViewInit(): void {


  }


}

