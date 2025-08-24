import { Component, output, signal, ContentChildren, QueryList, AfterContentInit, effect, untracked, inject, DestroyRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TabComponent } from './tab/tab';

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
  private destroyRef = inject(DestroyRef);

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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tabs: QueryList<TabComponent>) => {
        this.updateTabs(tabs.toArray());
      });
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
