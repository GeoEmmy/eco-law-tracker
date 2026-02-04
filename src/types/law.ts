export interface Law {
  id: string;
  name: string;
  category: '법률' | '시행령' | '시행규칙' | '규칙' | '고시';
  effectiveDate: string;
  lawNumber?: string;
  relatedRules?: string[];
  relatedStandards?: string[];
  parentLaw?: string;
  keyArticles?: string[];
  topics?: string[];
  obligationRates?: Record<string, string>;
}

export interface LocalOrdinance {
  id: string;
  name: string;
  effectiveDate?: string;
  topics?: string[];
}

export interface LawData {
  metadata: {
    version: string;
    description: string;
    source: string;
  };
  nationalLaws: Law[];
  localOrdinances: Record<string, LocalOrdinance[]>;
  waterReuseOrdinances: string[];
}
