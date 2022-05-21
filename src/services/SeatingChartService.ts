import {SeatingChart} from '../store/slices/wedding';

interface SeatingChartServiceEntry {
  name: string,
  pattern: RegExp,
  table: string,
}

type SeatingChartServiceList = SeatingChartServiceEntry[];

export class SeatingChartService {
  private list: SeatingChartServiceList = [];

  private tags: string[] = [];

  public constructor(data?: SeatingChart) {
    if (data) {
      this.fromData(data);
    }
  }

  private fromData(data: SeatingChart) {
    const tagsSet: Set<string> = new Set();
    const nameToPattern = (name: string) => {
      if (name.charAt(0) === '*') {
        const tag = name.substring(1);
        tagsSet.add(tag);
        return tag;
      }

      const names = name.split(' ');
      const regexNames = [names[0]];
      for (let i = 1; i < names.length; i += 1) {
        regexNames.push(`( ${names[i]})?`);
      }
      const lastName = names[names.length - 1];
      return `(${regexNames.join('')})|(${lastName})`;
    };

    this.list = [];
    for (const [table, entries] of Object.entries(data)) {
      for (const entry of entries) {
        const listEntry: Partial<SeatingChartServiceEntry> = {table};
        if (typeof entry === 'string') {
          listEntry.name = entry;
          listEntry.pattern = new RegExp(`^((${nameToPattern(entry)}))$`, 'i');
        } else if (Array.isArray(entry) && entry.length > 0) {
          [listEntry.name] = entry;
          const entryPattern = entry
            .filter((alias) => typeof alias === 'string')
            .map((alias) => nameToPattern(alias)).join(')|(');
          listEntry.pattern = new RegExp(`^((${entryPattern}))$`, 'i');
        }

        this.list.push(listEntry as SeatingChartServiceEntry);
      }
    }

    this.tags = Array.from(tagsSet);
  }

  public getTable(name: string): Record<string, string> {
    return this.list
      .filter(({pattern}) => pattern.test(name))
      .reduce((obj, {name, table}) => {
        obj[name] = table;
        return obj;
      }, {} as Record<string, string>);
  }

  public getRandomTag(): string {
    return this.tags[Math.floor(Math.random() * this.tags.length)];
  }
}
