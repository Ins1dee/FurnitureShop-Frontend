import { Component, OnInit } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { StatisticService } from '../../services/statistic.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent implements OnInit {
  chart!: Chart;
  year:  number = 2023;
  month!: number[];
  totalAmount! : number[];

  constructor(private statisticService : StatisticService) {}

  ngOnInit(): void {
    Chart.register(LinearScale);
    Chart.register(BarController);
    Chart.register(CategoryScale);
    Chart.register(BarElement);

    this.statisticService.getStatByYear(this.year).subscribe({
      next: (result) => {
        this.month = result.map(x => {
          console.log(x.month);
          return x.month
        });
        console.log("M: " +  this.month);
        this.totalAmount = result.map(x => x.totalAmountPerMonth);
        console.log("Total: " +  this.totalAmount);
        this.chart = new Chart('myChart', {
          type: 'bar',
          data: {
            labels: this.month,
            datasets: [{
              label: 'Total income per year',
              data: this.totalAmount,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            borderColor: 'Purple',
            color: 'Purple'
          }
        });
      }
  }); 
  }

  getMonthName(monthNumber: number): string {
    const months: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Check if the month number is within valid range
    if (monthNumber < 1 || monthNumber > 13) {
        return "Invalid Month";
    }

    return months[monthNumber];
}

  sendYear()
  {
    this.chart.destroy();

    this.statisticService.getStatByYear(this.year).subscribe({
      next: (result) => {
        this.month = result.map(x => x.month);
        this.totalAmount = result.map(x => x.totalAmountPerMonth);

        this.chart = new Chart('myChart', {
          type: 'bar',
          data: {
            labels: this.month,
            datasets: [{
              label: 'Total income per year',
              data: this.totalAmount,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            borderColor: 'Purple',
            color: 'Purple'
          }
        });
      }
  }); 
  }
}
