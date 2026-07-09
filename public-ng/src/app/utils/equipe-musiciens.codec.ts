export interface EquipeMusicienRecord {
  jobId: number;
  personId: number;
  name: string;
  isHolder: number;
}

export function parseEquipeMusiciens(raw: string | null | undefined): EquipeMusicienRecord[] {
  if (!raw || raw.trim() === '') {
    return [];
  }

  const records: EquipeMusicienRecord[] = [];

  raw.split('||').forEach((jobBlock) => {
    jobBlock.split('|').forEach((memberBlock) => {
      const parts = memberBlock.split(',');
      if (parts.length < 4) {
        return;
      }

      const jobId = Number(parts[0]);
      const personId = Number(parts[1]) || 0;
      const isHolder = Number(parts[parts.length - 1]) || 0;
      const name = parts.slice(2, -1).join(',');

      if (!jobId || !name) {
        return;
      }

      records.push({
        jobId,
        personId,
        name,
        isHolder,
      });
    });
  });

  return records;
}

export function serializeEquipeMusiciens(records: Iterable<EquipeMusicienRecord>): string {
  const blocks = new Map<number, string[]>();

  for (const record of records) {
    if (!blocks.has(record.jobId)) {
      blocks.set(record.jobId, []);
    }

    blocks
      .get(record.jobId)!
      .push(`${record.jobId},${record.personId},${record.name},${record.isHolder ?? 0}`);
  }

  return Array.from(blocks.values())
    .filter((members) => members.length > 0)
    .map((members) => members.join('|'))
    .join('||');
}
