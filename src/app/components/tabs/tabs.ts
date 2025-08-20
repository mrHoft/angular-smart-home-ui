import { Component, output, signal, ContentChildren, QueryList, AfterContentInit, effect, untracked } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TabComponent } from './tab/tab';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  imports: [NgTemplateOutlet]
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabComponents!: QueryList<TabComponent>;

  activeTabIndex = signal(0);
  tabs = signal<TabComponent[]>([]);
  onChange = output<string>();
  private destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      this.tabs().map(tab => tab.id());
      untracked(() => {
        this.updateTabs(this.tabs());
      });
    });
  }

  ngAfterContentInit(): void {
    this.updateTabs(this.tabComponents.toArray());

    this.tabComponents.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe((tabs: QueryList<TabComponent>) => {
        this.updateTabs(tabs.toArray());
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateTabs(tabs: TabComponent[]): void {
    this.tabs.set(tabs);
    this.setActiveTab(0);
  }

  public setActiveTab(index: number): void {
    const tabs = this.tabs()
    if (index >= 0 && index < tabs.length) {
      this.activeTabIndex.set(index);
      this.onChange.emit(tabs[index].id());
    }
  }
}
