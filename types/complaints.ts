
export interface Complaints {
    took: number
    timed_out: boolean
    _shards: Shards
    hits: Hits
    aggregations: Aggregations
    _meta: Meta12
  }
  
export interface Shards {
    total: number
    successful: number
    skipped: number
    failed: number
}

export interface Hits {
    total: Total
    max_score: any
    hits: Hit[]
}

export interface Total {
    value: number
    relation: string
}

export interface Hit {
    _index: string
    _type: string
    _id: string
    _score: number
    _source: Source
    sort: [number, string]
}

export interface Source {
    product: string
    complaint_what_happened: string
    date_sent_to_company: string
    issue: string
    sub_product?: string
    zip_code: string
    tags?: string
    has_narrative: boolean
    complaint_id: string
    timely: string
    consumer_consent_provided: string
    company_response: string
    submitted_via: string
    company: string
    date_received: string
    state: string
    consumer_disputed: string
    company_public_response: any
    sub_issue?: string
}

export interface Aggregations {
    has_narrative: HasNarrative
    product: Product
    issue: Issue
    timely: Timely
    consumer_consent_provided: ConsumerConsentProvided
    company_response: CompanyResponse
    submitted_via: SubmittedVia
    state: State
    consumer_disputed: ConsumerDisputed
    company_public_response: CompanyPublicResponse
    tags: Tags
}

export interface HasNarrative {
    meta: EmptyMeta
    doc_count: number
    has_narrative: HasNarrative2
}

export interface HasNarrative2 {
    doc_count_error_upper_bound: number
    sum_other_doc_count: number
    buckets: Bucket[]
}

export interface Bucket {
    key: number
    key_as_string: string
    doc_count: number
}

export interface Product {
    meta: EmptyMeta
    doc_count: number
    product: Product2
}

export interface EmptyMeta {}

export interface Product2 {
    doc_count_error_upper_bound: number
    sum_other_doc_count: number
    buckets: Bucket2[]
}

export interface Bucket2 {
    key: string
    doc_count: number
    "sub_product.raw": SubProductRaw
}

export interface SubProductRaw {
    doc_count_error_upper_bound: number
    sum_other_doc_count: number
    buckets: BasicBucket[]
}

export interface BasicBucket {
    key: string
    doc_count: number
}

export interface Issue {
    meta: EmptyMeta
    doc_count: number
    issue: Issue2
}

export interface Issue2 {
    doc_count_error_upper_bound: number
    sum_other_doc_count: number
    buckets: Bucket4[]
}

export interface Bucket4 {
    key: string
    doc_count: number
    "sub_issue.raw": Counts_Bucket
}

export interface Counts_Bucket {
    doc_count_error_upper_bound: number
    sum_other_doc_count: number
    buckets: BasicBucket[]
}

export interface Timely {
    meta: EmptyMeta
    doc_count: number
    timely: Counts_Bucket
}

export interface ConsumerConsentProvided {
    meta: EmptyMeta
    doc_count: number
    consumer_consent_provided: Counts_Bucket
}

export interface CompanyResponse {
    meta: EmptyMeta
    doc_count: number
    company_response: Counts_Bucket
}

export interface SubmittedVia {
    meta: EmptyMeta
    doc_count: number
    submitted_via: Counts_Bucket
}

export interface State {
    meta: EmptyMeta
    doc_count: number
    state: Counts_Bucket
}

export interface ConsumerDisputed {
    meta: EmptyMeta
    doc_count: number
    consumer_disputed: Counts_Bucket
}

export interface CompanyPublicResponse {
    meta: EmptyMeta
    doc_count: number
    company_public_response: Counts_Bucket
}

export interface Tags {
    meta: EmptyMeta
    doc_count: number
    tags: Counts_Bucket
}

export interface Meta12 {
    license: string
    last_updated: string
    last_indexed: string
    total_record_count: number
    is_data_stale: boolean
    has_data_issue: boolean
    break_points: Array<BreakPoints>
}

export interface BreakPoints {
    [key: string] : [number, string]
}
