declare module 'solclientjs' {
  /** Session interface todo more docs */
  export interface Session {
    /**connects to session with previously provided credentials and url */
    connect(): void;

    disconnect(): void;

    /** on session connection is up */
    on(
      eventCode: SessionEventCode.UP_NOTICE,
      listener: (eventArg: string) => void
    ): void;

    /** on message received */
    on(
      eventCode: SessionEventCode.MESSAGE,
      listener: (eventArg: Message) => void
    ): void;

    /** on subscription to a topic */
    on(
      eventCode: SessionEventCode.SUBSCRIPTION_OK,
      listener: (eventArg: unknown) => void
    ): void;

    /** subscribe to an existing topic */
    subscribe(
      topic: Topic,
      reqConfirmation: boolean,
      correlationKey?: string,
      reqTimeout?: number
    ): void;
  }

  export type Destination = {
    name: string;
    type: string;
  };

  export type Topic = Destination;

  export enum MessageDumpFlag {
    MSGDUMP_BRIEF = 0,
    MSGDUMP_FULL = 1,
  }

  export type SdtContainer = {
    getValue: () => string;
  };

  export type Message = {
    getBinaryAttachment: () => string;
    getSdtContainer: () => SdtContainer;
    dump: (flag?: MessageDumpFlag) => void;
  };

  /**session url, user, pass.. */
  export type SessionProperties = {
    url: string;
    vpnName: string;
    userName: string;
    password: string;
  };

  /**on event emitter codes */
  export enum SessionEventCode {
    UP_NOTICE = 0,
    MESSAGE = 28,
    SUBSCRIPTION_OK = 6,
  }

  /**Factory profile boolean flags */
  export type FactoryProfile = {
    byteArrayAsString: boolean;
    cometEnabled: boolean;
    guaranteedMessagingEnabled: boolean;
    topicUtf8Encode: boolean;
  };

  /**
   * Factory Initialisation props
   */
  export type SolclientFactoryProperties = {
    logger?: Record<string, unknown>;
    logLevel?: number;
    profile?: FactoryProfile;
  };

  /**
   * Solace Client builder factory
   * @returns functions
   */
  export namespace SolclientFactory {
    /**
     * Creates a new solace session with props
     * @param props session props contain, url, vpn, username, password
     */
    function createSession(props: SessionProperties): Session;

    /**
     * Creates a new topic destination to be used in subscription.
     * Topic is not created
     * @param topic name of topic
     */
    function createTopicDestination(topic: string): Destination;

    /**
     * Initializes the factory
     * @param props factory init params, optional
     */
    function init(props: SolclientFactoryProperties): void;

    /**
     *
     * @param topic creates a new topic
     */
    function createTopic(topic: string): Topic;
  }
}
