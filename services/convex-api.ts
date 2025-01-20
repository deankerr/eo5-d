import { FunctionReference, anyApi } from "convex/server";
import { GenericId as Id } from "convex/values";

export const api: PublicApiType = anyApi as unknown as PublicApiType;
export const internal: InternalApiType = anyApi as unknown as InternalApiType;

export type PublicApiType = {
  entities: {
    audio: {
      generate: {
        soundEffect: FunctionReference<
          "action",
          "public",
          {
            apiKey?: string;
            duration_seconds?: number;
            prompt_influence?: number;
            text: string;
          },
          string
        >;
      };
      public: {
        get: FunctionReference<
          "query",
          "public",
          { apiKey?: string; audioId: string },
          null | {
            _creationTime: number;
            _id: Id<"audio">;
            fileId: Id<"_storage">;
            fileUrl: null | string;
            generationData: {
              duration?: number;
              endpointId: string;
              modelId: string;
              modelName: string;
              prompt: string;
            };
            userId: Id<"users">;
            xid: string;
          }
        >;
        listMy: FunctionReference<
          "query",
          "public",
          {
            apiKey?: string;
            paginationOpts: {
              cursor: string | null;
              endCursor?: string | null;
              id?: number;
              maximumBytesRead?: number;
              maximumRowsRead?: number;
              numItems: number;
            };
          },
          {
            continueCursor: string;
            isDone: boolean;
            page: Array<{
              _creationTime: number;
              _id: Id<"audio">;
              fileId: Id<"_storage">;
              fileUrl: null | string;
              generationData: {
                duration?: number;
                endpointId: string;
                modelId: string;
                modelName: string;
                prompt: string;
              };
              userId: Id<"users">;
              xid: string;
            }>;
            pageStatus?: "SplitRequired" | "SplitRecommended" | null;
            splitCursor?: string | null;
          }
        >;
      };
    };
    patterns: {
      public: {
        create: FunctionReference<
          "mutation",
          "public",
          {
            apiKey?: string;
            description: string;
            dynamicMessage?: {
              channel?: string;
              depth?: number;
              name?: string;
              role?: "system" | "assistant" | "user";
              text: string;
            };
            dynamicMessages: Array<{
              message: {
                channel?: string;
                name?: string;
                role: "system" | "assistant" | "user";
                text: string;
              };
            }>;
            initialMessages: Array<{
              channel?: string;
              name?: string;
              role: "system" | "assistant" | "user";
              text: string;
            }>;
            instructions: string;
            kvMetadata: any;
            model: {
              frequencyPenalty?: number;
              id: string;
              maxTokens?: number;
              presencePenalty?: number;
              provider?: string;
              repetitionPenalty?: number;
              stop?: Array<string>;
              temperature?: number;
              topK?: number;
              topP?: number;
            };
            name: string;
            options?: { maxCompletionTokens?: number; maxMessages?: number };
          },
          string
        >;
        get: FunctionReference<
          "query",
          "public",
          { apiKey?: string; patternId: string },
          null | {
            _creationTime: number;
            _id: Id<"patterns">;
            description: string;
            dynamicMessage?: {
              channel?: string;
              depth?: number;
              name?: string;
              role?: "system" | "assistant" | "user";
              text: string;
            };
            dynamicMessages: Array<{
              message: {
                channel?: string;
                name?: string;
                role: "system" | "assistant" | "user";
                text: string;
              };
            }>;
            initialMessages: Array<{
              channel?: string;
              name?: string;
              role: "system" | "assistant" | "user";
              text: string;
            }>;
            instructions: string;
            kvMetadata: any;
            lastUsedAt: number;
            model: {
              frequencyPenalty?: number;
              id: string;
              maxTokens?: number;
              presencePenalty?: number;
              provider?: string;
              repetitionPenalty?: number;
              stop?: Array<string>;
              temperature?: number;
              topK?: number;
              topP?: number;
            };
            name: string;
            options?: { maxCompletionTokens?: number; maxMessages?: number };
            updatedAt: number;
            userId: Id<"users">;
            xid: string;
          }
        >;
        listMy: FunctionReference<
          "query",
          "public",
          { apiKey?: string },
          null | Array<{
            _creationTime: number;
            _id: Id<"patterns">;
            description: string;
            dynamicMessage?: {
              channel?: string;
              depth?: number;
              name?: string;
              role?: "system" | "assistant" | "user";
              text: string;
            };
            dynamicMessages: Array<{
              message: {
                channel?: string;
                name?: string;
                role: "system" | "assistant" | "user";
                text: string;
              };
            }>;
            initialMessages: Array<{
              channel?: string;
              name?: string;
              role: "system" | "assistant" | "user";
              text: string;
            }>;
            instructions: string;
            kvMetadata: any;
            lastUsedAt: number;
            model: {
              frequencyPenalty?: number;
              id: string;
              maxTokens?: number;
              presencePenalty?: number;
              provider?: string;
              repetitionPenalty?: number;
              stop?: Array<string>;
              temperature?: number;
              topK?: number;
              topP?: number;
            };
            name: string;
            options?: { maxCompletionTokens?: number; maxMessages?: number };
            updatedAt: number;
            userId: Id<"users">;
            xid: string;
          }>
        >;
        remove: FunctionReference<
          "mutation",
          "public",
          { apiKey?: string; patternId: string },
          string
        >;
        update: FunctionReference<
          "mutation",
          "public",
          {
            apiKey?: string;
            fields: {
              description: string;
              dynamicMessage?: {
                channel?: string;
                depth?: number;
                name?: string;
                role?: "system" | "assistant" | "user";
                text: string;
              };
              dynamicMessages: Array<{
                message: {
                  channel?: string;
                  name?: string;
                  role: "system" | "assistant" | "user";
                  text: string;
                };
              }>;
              initialMessages: Array<{
                channel?: string;
                name?: string;
                role: "system" | "assistant" | "user";
                text: string;
              }>;
              instructions: string;
              kvMetadata: any;
              model: {
                frequencyPenalty?: number;
                id: string;
                maxTokens?: number;
                presencePenalty?: number;
                provider?: string;
                repetitionPenalty?: number;
                stop?: Array<string>;
                temperature?: number;
                topK?: number;
                topP?: number;
              };
              name: string;
              options?: { maxCompletionTokens?: number; maxMessages?: number };
            };
            patternId: string;
          },
          string
        >;
      };
    };
    texts: {
      public: {
        deletePrompt: FunctionReference<
          "mutation",
          "public",
          { _id: Id<"texts">; apiKey?: string },
          any
        >;
        getPrompt: FunctionReference<
          "query",
          "public",
          { _id: string; apiKey?: string },
          null | {
            _creationTime: number;
            _id: Id<"texts">;
            content: string;
            title: string;
            type: "prompt";
            updatedAt: number;
            userId: Id<"users">;
          }
        >;
        listMyPrompts: FunctionReference<
          "query",
          "public",
          { apiKey?: string },
          Array<{
            _creationTime: number;
            _id: Id<"texts">;
            content: string;
            title: string;
            type: "prompt";
            updatedAt: number;
            userId: Id<"users">;
          }>
        >;
        setPrompt: FunctionReference<
          "mutation",
          "public",
          {
            _id?: Id<"texts">;
            apiKey?: string;
            content: string;
            title: string;
          },
          any
        >;
      };
    };
    chatModels: {
      public: {
        list: FunctionReference<
          "query",
          "public",
          { apiKey?: string },
          Array<{
            _creationTime: number;
            _id: Id<"chat_models">;
            available: boolean;
            contextLength: number;
            coverImageUrl?: string;
            created: number;
            creatorName: string;
            description: string;
            hidden: boolean;
            internalScore: number;
            license: string;
            link: string;
            maxOutputTokens?: number;
            modelId: string;
            moderated: boolean;
            name: string;
            numParameters?: number;
            pricing: {
              imageInput?: number;
              imageOutput?: number;
              tokenInput: number;
              tokenOutput: number;
            };
            provider: string;
            resourceKey: string;
            stop?: Array<string>;
            tags: Array<string>;
            tokenizer: string;
          }>
        >;
      };
    };
    images: {
      public: {
        getByRunId: FunctionReference<
          "query",
          "public",
          { apiKey?: string; runId: string },
          Array<{
            _creationTime: number;
            _id: Id<"images_v2">;
            blurDataUrl: string;
            collectionIds: Array<Id<"collections">>;
            color: string;
            createdAt?: number;
            fileId: Id<"_storage">;
            format: string;
            generationId?: Id<"generations_v2">;
            height: number;
            ownerId: Id<"users">;
            runId: string;
            sourceType: string;
            sourceUrl: string;
            width: number;
            xid: string;
          }>
        >;
        listMy: FunctionReference<
          "query",
          "public",
          {
            apiKey?: string;
            order?: "asc" | "desc";
            paginationOpts: {
              cursor: string | null;
              endCursor?: string | null;
              id?: number;
              maximumBytesRead?: number;
              maximumRowsRead?: number;
              numItems: number;
            };
          },
          {
            continueCursor: string;
            isDone: boolean;
            page: Array<{
              _creationTime: number;
              _id: Id<"images_v2">;
              blurDataUrl: string;
              collectionIds: Array<Id<"collections">>;
              color: string;
              createdAt?: number;
              fileId: Id<"_storage">;
              format: string;
              generationId?: Id<"generations_v2">;
              height: number;
              ownerId: Id<"users">;
              runId: string;
              sourceType: string;
              sourceUrl: string;
              width: number;
              xid: string;
            }>;
            pageStatus?: "SplitRequired" | "SplitRecommended" | null;
            splitCursor?: string | null;
          }
        >;
        remove: FunctionReference<
          "mutation",
          "public",
          { apiKey?: string; imageId: string },
          any
        >;
      };
    };
    imagesMetadata: {
      public: {
        add: FunctionReference<
          "mutation",
          "public",
          {
            apiKey?: string;
            fields:
              | {
                  description: string;
                  modelId: string;
                  modelName?: string;
                  ocr: Array<string>;
                  title: string;
                  type: "caption";
                  version: number;
                }
              | {
                  cost?: number;
                  generationType?: string;
                  guidanceScale?: number;
                  height?: number;
                  loras?: Array<{ path: string; scale?: number }>;
                  modelId: string;
                  modelName: string;
                  n?: number;
                  negativePrompt?: string;
                  nthInBatch?: number;
                  prompt: string;
                  provider: string;
                  seed?: number;
                  size?: string;
                  steps?: number;
                  type: "generation";
                  version: number;
                  width?: number;
                  workflow?: string;
                }
              | { nsfwProbability: number; type: "nsfwProbability" }
              | {
                  messageId?: string;
                  name?: string;
                  role: string;
                  text: string;
                  threadId?: string;
                  type: "message";
                };
            imageId: string;
          },
          string
        >;
        get: FunctionReference<
          "query",
          "public",
          { apiKey?: string; imageId: string },
          Array<{
            _creationTime: number;
            _id: Id<"images_metadata_v2">;
            data:
              | {
                  description: string;
                  modelId: string;
                  modelName?: string;
                  ocr: Array<string>;
                  title: string;
                  type: "caption";
                  version: number;
                }
              | {
                  cost?: number;
                  generationType?: string;
                  guidanceScale?: number;
                  height?: number;
                  loras?: Array<{ path: string; scale?: number }>;
                  modelId: string;
                  modelName: string;
                  n?: number;
                  negativePrompt?: string;
                  nthInBatch?: number;
                  prompt: string;
                  provider: string;
                  seed?: number;
                  size?: string;
                  steps?: number;
                  type: "generation";
                  version: number;
                  width?: number;
                  workflow?: string;
                }
              | { nsfwProbability: number; type: "nsfwProbability" }
              | {
                  messageId?: string;
                  name?: string;
                  role: string;
                  text: string;
                  threadId?: string;
                  type: "message";
                };
            imageId: Id<"images_v2">;
            type: "caption" | "generation" | "nsfwProbability" | "message";
            xid: string;
          }>
        >;
      };
    };
    collections: {
      public: {
        create: FunctionReference<
          "mutation",
          "public",
          {
            apiKey?: string;
            imageIds?: Array<Id<"images_v2">>;
            kvMetadata?: any;
            title: string;
          },
          any
        >;
        get: FunctionReference<
          "query",
          "public",
          { apiKey?: string; collectionId: string },
          null | {
            _creationTime: number;
            _id: Id<"collections">;
            images: Array<{
              _creationTime: number;
              _id: Id<"images_v2">;
              blurDataUrl: string;
              collectionIds: Array<Id<"collections">>;
              color: string;
              createdAt?: number;
              fileId: Id<"_storage">;
              format: string;
              generationId?: Id<"generations_v2">;
              height: number;
              ownerId: Id<"users">;
              runId: string;
              sourceType: string;
              sourceUrl: string;
              width: number;
              xid: string;
            }>;
            kvMetadata?: any;
            ownerId: Id<"users">;
            title: string;
            xid: string;
          }
        >;
        latest: FunctionReference<
          "query",
          "public",
          { apiKey?: string },
          null | Array<{
            _creationTime: number;
            _id: Id<"collections">;
            images: Array<{
              _creationTime: number;
              _id: Id<"images_v2">;
              blurDataUrl: string;
              collectionIds: Array<Id<"collections">>;
              color: string;
              createdAt?: number;
              fileId: Id<"_storage">;
              format: string;
              generationId?: Id<"generations_v2">;
              height: number;
              ownerId: Id<"users">;
              runId: string;
              sourceType: string;
              sourceUrl: string;
              width: number;
              xid: string;
            }>;
            kvMetadata?: any;
            ownerId: Id<"users">;
            title: string;
            xid: string;
          }>
        >;
        listImages: FunctionReference<
          "query",
          "public",
          {
            apiKey?: string;
            collectionId: string;
            order?: "asc" | "desc";
            paginationOpts: {
              cursor: string | null;
              endCursor?: string | null;
              id?: number;
              maximumBytesRead?: number;
              maximumRowsRead?: number;
              numItems: number;
            };
          },
          {
            continueCursor: string;
            isDone: boolean;
            page: Array<{
              _creationTime: number;
              _id: Id<"images_v2">;
              blurDataUrl: string;
              collectionIds: Array<Id<"collections">>;
              color: string;
              createdAt?: number;
              fileId: Id<"_storage">;
              format: string;
              generationId?: Id<"generations_v2">;
              height: number;
              ownerId: Id<"users">;
              runId: string;
              sourceType: string;
              sourceUrl: string;
              width: number;
              xid: string;
            }>;
            pageStatus?: "SplitRequired" | "SplitRecommended" | null;
            splitCursor?: string | null;
          }
        >;
        remove: FunctionReference<
          "mutation",
          "public",
          { apiKey?: string; collectionId: string },
          any
        >;
        update: FunctionReference<
          "mutation",
          "public",
          {
            apiKey?: string;
            collectionId: string;
            images_v2?: {
              add?: Array<Id<"images_v2">>;
              remove?: Array<Id<"images_v2">>;
            };
            title?: string;
            updateKv?: { delete?: Array<string>; set?: any; setUnique?: any };
          },
          any
        >;
      };
    };
    users: {
      public: {
        getViewer: FunctionReference<
          "query",
          "public",
          { apiKey?: string },
          null | {
            _creationTime: number;
            _id: Id<"users">;
            imageUrl: string;
            name: string;
            role: "user" | "admin";
          }
        >;
      };
      keys: {
        generateViewerApiKey: FunctionReference<
          "mutation",
          "public",
          { apiKey?: string },
          any
        >;
      };
    };
    operationsEventLogs: {
      public: {
        latest: FunctionReference<
          "query",
          "public",
          { apiKey?: string; limit?: number },
          any
        >;
      };
    };
    generations: {
      public: {
        create: FunctionReference<
          "mutation",
          "public",
          {
            apiKey?: string;
            inputs: Array<{
              guidanceScale?: number;
              height?: number;
              loras?: Array<{ path: string; scale?: number }>;
              modelId: string;
              n?: number;
              negativePrompt?: string;
              prompt: string;
              seed?: number;
              size?: string;
              steps?: number;
              type: "textToImage";
              width?: number;
              workflow?: string;
            }>;
          },
          { generationIds: Array<string>; runId: string }
        >;
        get: FunctionReference<
          "query",
          "public",
          { apiKey?: string; generationId: string },
          null | {
            _creationTime: number;
            _id: Id<"generations_v2">;
            errors?: Array<any>;
            images?: Array<{
              _creationTime: number;
              _id: Id<"images_v2">;
              blurDataUrl: string;
              collectionIds: Array<Id<"collections">>;
              color: string;
              createdAt?: number;
              fileId: Id<"_storage">;
              format: string;
              generationId?: Id<"generations_v2">;
              height: number;
              ownerId: Id<"users">;
              runId: string;
              sourceType: string;
              sourceUrl: string;
              width: number;
              xid: string;
            }>;
            input: any;
            output?: any;
            ownerId: Id<"users">;
            results?: Array<{
              contentType: string;
              height: number;
              url: string;
              width: number;
            }>;
            runId: string;
            status: "queued" | "active" | "done" | "failed";
            updatedAt: number;
            workflow?: string;
            xid: string;
          }
        >;
        listMy: FunctionReference<
          "query",
          "public",
          {
            apiKey?: string;
            paginationOpts: {
              cursor: string | null;
              endCursor?: string | null;
              id?: number;
              maximumBytesRead?: number;
              maximumRowsRead?: number;
              numItems: number;
            };
          },
          {
            continueCursor: string;
            isDone: boolean;
            page: Array<{
              _creationTime: number;
              _id: Id<"generations_v2">;
              errors?: Array<any>;
              images?: Array<{
                _creationTime: number;
                _id: Id<"images_v2">;
                blurDataUrl: string;
                collectionIds: Array<Id<"collections">>;
                color: string;
                createdAt?: number;
                fileId: Id<"_storage">;
                format: string;
                generationId?: Id<"generations_v2">;
                height: number;
                ownerId: Id<"users">;
                runId: string;
                sourceType: string;
                sourceUrl: string;
                width: number;
                xid: string;
              }>;
              input: any;
              output?: any;
              ownerId: Id<"users">;
              results?: Array<{
                contentType: string;
                height: number;
                url: string;
                width: number;
              }>;
              runId: string;
              status: "queued" | "active" | "done" | "failed";
              updatedAt: number;
              workflow?: string;
              xid: string;
            }>;
            pageStatus?: "SplitRequired" | "SplitRecommended" | null;
            splitCursor?: string | null;
          }
        >;
        remove: FunctionReference<
          "mutation",
          "public",
          { apiKey?: string; destroyImages: boolean; generationId: string },
          null
        >;
      };
    };
    threads: {
      runs: {
        adminListAll: FunctionReference<
          "query",
          "public",
          {
            apiKey?: string;
            paginationOpts: {
              cursor: string | null;
              endCursor?: string | null;
              id?: number;
              maximumBytesRead?: number;
              maximumRowsRead?: number;
              numItems: number;
            };
          },
          any
        >;
        create: FunctionReference<
          "mutation",
          "public",
          {
            additionalInstructions?: string;
            apiKey?: string;
            appendMessages?: Array<{
              channel?: string;
              kvMetadata?: any;
              name?: string;
              role: "system" | "assistant" | "user";
              runId?: Id<"runs">;
              text?: string;
            }>;
            dynamicMessage?: {
              channel?: string;
              depth?: number;
              name?: string;
              role?: "system" | "assistant" | "user";
              text: string;
            };
            instructions?: string;
            kvMetadata?: any;
            model?: {
              frequencyPenalty?: number;
              id: string;
              maxTokens?: number;
              presencePenalty?: number;
              provider?: string;
              repetitionPenalty?: number;
              stop?: Array<string>;
              temperature?: number;
              topK?: number;
              topP?: number;
            };
            options?: {
              maxCompletionTokens?: number;
              maxMessages?: number;
              resultChannel?: string;
            };
            patternId?: string;
            stream: boolean;
            threadId: string;
          },
          string
        >;
        get: FunctionReference<
          "query",
          "public",
          { apiKey?: string; runId: string },
          null | {
            _creationTime: number;
            _id: Id<"runs">;
            additionalInstructions?: string;
            dynamicMessage?: {
              channel?: string;
              depth?: number;
              name?: string;
              role?: "system" | "assistant" | "user";
              text: string;
            };
            errors?: Array<{ code: string; data?: any; message: string }>;
            instructions?: string;
            kvMetadata?: any;
            model: {
              frequencyPenalty?: number;
              id: string;
              maxTokens?: number;
              presencePenalty?: number;
              provider?: string;
              repetitionPenalty?: number;
              stop?: Array<string>;
              temperature?: number;
              topK?: number;
              topP?: number;
            };
            options?: {
              maxCompletionTokens?: number;
              maxMessages?: number;
              resultChannel?: string;
            };
            patternId?: Id<"patterns">;
            providerMetadata?: any;
            results?: Array<{ id: Id<"messages">; type: "message" }>;
            status: "queued" | "active" | "done" | "failed";
            stream: boolean;
            threadId: Id<"threads">;
            timings: {
              endedAt?: number;
              firstTokenAt?: number;
              queuedAt: number;
              startedAt?: number;
            };
            updatedAt: number;
            usage?: {
              completionTokens: number;
              cost?: number;
              finishReason: string;
              modelId: string;
              promptTokens: number;
              requestId: string;
            };
            userId: Id<"users">;
            xid: string;
          }
        >;
        getTextStreams: FunctionReference<
          "query",
          "public",
          { apiKey?: string; runId: string },
          null | Array<{ _id: Id<"texts">; content: string }>
        >;
      };
      messages: {
        create: FunctionReference<
          "mutation",
          "public",
          {
            apiKey?: string;
            channel?: string;
            kvMetadata?: any;
            name?: string;
            role: "system" | "assistant" | "user";
            runId?: Id<"runs">;
            text?: string;
            threadId: string;
          },
          string
        >;
        get: FunctionReference<
          "query",
          "public",
          { apiKey?: string; messageId: string },
          null | {
            _creationTime: number;
            _id: Id<"messages">;
            channel?: string;
            kvMetadata?: any;
            name?: string;
            role: "system" | "assistant" | "user";
            runId?: string;
            series: number;
            text?: string;
            threadId: Id<"threads">;
            userId: Id<"users">;
            xid: string;
          }
        >;
        getArtifactTitle: FunctionReference<
          "query",
          "public",
          { apiKey?: string; messageId: string },
          null | string
        >;
        getSeries: FunctionReference<
          "query",
          "public",
          { apiKey?: string; series: number; threadId: string },
          null | {
            _creationTime: number;
            _id: Id<"messages">;
            channel?: string;
            kvMetadata?: any;
            name?: string;
            role: "system" | "assistant" | "user";
            runId?: string;
            series: number;
            text?: string;
            threadId: Id<"threads">;
            userId: Id<"users">;
            xid: string;
          }
        >;
        list: FunctionReference<
          "query",
          "public",
          {
            apiKey?: string;
            channel?: string;
            paginationOpts: {
              cursor: string | null;
              endCursor?: string | null;
              id?: number;
              maximumBytesRead?: number;
              maximumRowsRead?: number;
              numItems: number;
            };
            threadId: string;
          },
          {
            continueCursor: string;
            isDone: boolean;
            page: Array<{
              _creationTime: number;
              _id: Id<"messages">;
              channel?: string;
              kvMetadata?: any;
              name?: string;
              role: "system" | "assistant" | "user";
              runId?: string;
              series: number;
              text?: string;
              threadId: Id<"threads">;
              userId: Id<"users">;
              xid: string;
            }>;
            pageStatus?: "SplitRequired" | "SplitRecommended" | null;
            splitCursor?: string | null;
          }
        >;
        remove: FunctionReference<
          "mutation",
          "public",
          { apiKey?: string; messageId: string },
          string
        >;
        search: FunctionReference<
          "query",
          "public",
          {
            apiKey?: string;
            createdAfter?: number;
            createdBefore?: number;
            name?: string;
            order?: "asc" | "desc";
            paginationOpts: {
              cursor: string | null;
              endCursor?: string | null;
              id?: number;
              maximumBytesRead?: number;
              maximumRowsRead?: number;
              numItems: number;
            };
            role?: "system" | "assistant" | "user";
            threadId: string;
          },
          {
            continueCursor: string;
            isDone: boolean;
            page: Array<{
              _creationTime: number;
              _id: Id<"messages">;
              channel?: string;
              kvMetadata?: any;
              name?: string;
              role: "system" | "assistant" | "user";
              runId?: string;
              series: number;
              text?: string;
              threadId: Id<"threads">;
              userId: Id<"users">;
              xid: string;
            }>;
            pageStatus?: "SplitRequired" | "SplitRecommended" | null;
            splitCursor?: string | null;
          }
        >;
        searchText: FunctionReference<
          "query",
          "public",
          {
            apiKey?: string;
            limit?: number;
            name?: string;
            role?: "system" | "assistant" | "user";
            text: string;
            threadId: string;
          },
          null | Array<{
            _creationTime: number;
            _id: Id<"messages">;
            channel?: string;
            kvMetadata?: any;
            name?: string;
            role: "system" | "assistant" | "user";
            runId?: string;
            series: number;
            text?: string;
            threadId: Id<"threads">;
            userId: Id<"users">;
            xid: string;
          }>
        >;
        update: FunctionReference<
          "mutation",
          "public",
          {
            apiKey?: string;
            fields: {
              channel?: string;
              kvMetadata?: {
                delete?: Array<string>;
                set?: any;
                setUnique?: any;
              };
              name?: string;
              role?: "system" | "assistant" | "user";
              text?: string;
            };
            messageId: string;
          },
          string
        >;
      };
      create: FunctionReference<
        "mutation",
        "public",
        {
          apiKey?: string;
          favourite?: boolean;
          instructions?: string;
          kvMetadata?: any;
          messages?: Array<{
            channel?: string;
            kvMetadata?: any;
            name?: string;
            role: "system" | "assistant" | "user";
            text?: string;
          }>;
          title?: string;
          type?: "chat" | "artifact" | "machine";
        },
        string
      >;
      get: FunctionReference<
        "query",
        "public",
        { apiKey?: string; threadId: string },
        null | {
          _creationTime: number;
          _id: Id<"threads">;
          category?: string;
          favourite?: boolean;
          instructions?: string;
          kvMetadata?: any;
          title?: string;
          updatedAtTime: number;
          userId: Id<"users">;
          xid: string;
        }
      >;
      listMy: FunctionReference<
        "query",
        "public",
        { apiKey?: string },
        null | Array<{
          _creationTime: number;
          _id: Id<"threads">;
          category?: string;
          favourite?: boolean;
          instructions?: string;
          kvMetadata?: any;
          latestMessage?: {
            _creationTime: number;
            _id: Id<"messages">;
            channel?: string;
            kvMetadata?: any;
            name?: string;
            role: "system" | "assistant" | "user";
            runId?: string;
            series: number;
            text?: string;
            threadId: Id<"threads">;
            userId: Id<"users">;
            xid: string;
          };
          model?: { creatorName: string; modelId: string; name: string };
          title?: string;
          updatedAtTime: number;
          userId: Id<"users">;
          xid: string;
        }>
      >;
      remove: FunctionReference<
        "mutation",
        "public",
        { apiKey?: string; threadId: string },
        string
      >;
      update: FunctionReference<
        "mutation",
        "public",
        {
          apiKey?: string;
          fields: {
            favourite?: boolean;
            instructions?: string;
            kvMetadata?: { delete?: Array<string>; set?: any; setUnique?: any };
            title?: string;
            type?: "chat" | "artifact" | "machine";
          };
          threadId: string;
        },
        string
      >;
    };
  };
};
export type InternalApiType = {};
