// FilterPanel.tsx - Neue Datei für src/components/
import React, { useState } from 'react';
import { Dropdown, DatePicker, Stack, Label, IDropdownOption } from '@fluentui/react';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
  onFiltersChange: (filters: ChatFilters) => void;
}

export interface ChatFilters {
  projectId: string;
  startDate: Date | null;
  endDate: Date | null;
}

// Ihre Project ID Mappings
const PROJECT_OPTIONS: IDropdownOption[] = [
  { key: '', text: 'Alle Projekte' },
  { key: 'EC6B05B0-7D92-1242-A9BC-5068CDEBDDE5', text: 'Energie' },
  { key: 'AE03B6DF-89AD-8B4B-87A8-4D8178E7DDC5', text: 'Wien' },
  { key: '19DB2B4A-231B-BB49-9698-1FF3B49461C4', text: 'Oberösterreich' },
  { key: 'AA144B6E-8568-3749-818F-511EC90DF1D3', text: 'Niederösterreich' },
  { key: '108ACFBA-148C-B041-9F4E-803834FE7957', text: 'Kärnten' },
  { key: '06FC5C24-26CE-D641-96C6-92344406FE63', text: 'Steiermark' },
  { key: '619EAD15-268A-E642-A24F-8F11EDACA3AC', text: 'Magistrat Graz' },
  { key: 'F6911461-4109-CD43-8233-43F75FBA0891', text: 'Land Salzburg' },
  { key: 'E7499CCF-434A-A547-B429-3B6F073C56E3', text: 'Frauen' },
  { key: 'B2B1DA20-4526-B54E-81F5-44A6F415CEFB', text: 'Gesundheit' },
  { key: 'CDA39FA9-EACE-1241-9DFE-D25EE3039071', text: 'Sport' },
  { key: 'F0A10347-3894-8146-BD50-EC92D43DB3DD', text: 'Arbeiterkammer' }
];

export const FilterPanel: React.FC<FilterPanelProps> = ({ onFiltersChange }) => {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleProjectChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    const projectId = option?.key as string || '';
    setSelectedProject(projectId);
    onFiltersChange({
      projectId,
      startDate,
      endDate
    });
  };

  const handleStartDateChange = (date: Date | null | undefined) => {
    const newStartDate = date || null;
    setStartDate(newStartDate);
    onFiltersChange({
      projectId: selectedProject,
      startDate: newStartDate,
      endDate
    });
  };

  const handleEndDateChange = (date: Date | null | undefined) => {
    const newEndDate = date || null;
    setEndDate(newEndDate);
    onFiltersChange({
      projectId: selectedProject,
      startDate,
      endDate: newEndDate
    });
  };

  const clearFilters = () => {
    setSelectedProject('');
    setStartDate(null);
    setEndDate(null);
    onFiltersChange({
      projectId: '',
      startDate: null,
      endDate: null
    });
  };

  return (
    <div className={styles.filterPanel}>
      <Stack tokens={{ childrenGap: 15 }}>
        <Label className={styles.filterTitle}>🔍 Filter</Label>
        
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <Stack.Item grow>
            <Label>Projekt</Label>
            <Dropdown
              placeholder="Projekt auswählen"
              options={PROJECT_OPTIONS}
              selectedKey={selectedProject}
              onChange={handleProjectChange}
              styles={{ dropdown: { width: '100%' } }}
            />
          </Stack.Item>

          <Stack.Item grow>
            <Label>Von Datum</Label>
            <DatePicker
              placeholder="Startdatum wählen"
              value={startDate}
              onSelectDate={handleStartDateChange}
              formatDate={(date?: Date) => date?.toLocaleDateString('de-DE')}
            />
          </Stack.Item>

          <Stack.Item grow>
            <Label>Bis Datum</Label>
            <DatePicker
              placeholder="Enddatum wählen"
              value={endDate}
              onSelectDate={handleEndDateChange}
              formatDate={(date?: Date) => date?.toLocaleDateString('de-DE')}
            />
          </Stack.Item>

          <Stack.Item>
            <Label>&nbsp;</Label>
            <button 
              className={styles.clearButton}
              onClick={clearFilters}
              title="Filter zurücksetzen"
            >
              ✕ Zurücksetzen
            </button>
          </Stack.Item>
        </Stack>

        {(selectedProject || startDate || endDate) && (
          <div className={styles.activeFilters}>
            <strong>Aktive Filter:</strong>
            {selectedProject && (
              <span className={styles.filterTag}>
                📁 {PROJECT_OPTIONS.find(p => p.key === selectedProject)?.text}
              </span>
            )}
            {startDate && (
              <span className={styles.filterTag}>
                📅 Ab: {startDate.toLocaleDateString('de-DE')}
              </span>
            )}
            {endDate && (
              <span className={styles.filterTag}>
                📅 Bis: {endDate.toLocaleDateString('de-DE')}
              </span>
            )}
          </div>
        )}
      </Stack>
    </div>
  );
};
