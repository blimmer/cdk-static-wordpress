# replace this
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### WordpressServerless <a name="WordpressServerless" id="cdk-wordpress-serverless.WordpressServerless"></a>

#### Initializers <a name="Initializers" id="cdk-wordpress-serverless.WordpressServerless.Initializer"></a>

```typescript
import { WordpressServerless } from 'cdk-wordpress-serverless'

new WordpressServerless(scope: Construct, id: string, props: IWordpressServerlessProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps">IWordpressServerlessProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-wordpress-serverless.IWordpressServerlessProps">IWordpressServerlessProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-wordpress-serverless.WordpressServerless.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-wordpress-serverless.WordpressServerless.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-wordpress-serverless.WordpressServerless.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-wordpress-serverless.WordpressServerless.isConstruct"></a>

```typescript
import { WordpressServerless } from 'cdk-wordpress-serverless'

WordpressServerless.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-wordpress-serverless.WordpressServerless.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-wordpress-serverless.WordpressServerless.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-wordpress-serverless.WordpressServerless.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### WordpressAdminProps <a name="WordpressAdminProps" id="cdk-wordpress-serverless.WordpressAdminProps"></a>

#### Initializer <a name="Initializer" id="cdk-wordpress-serverless.WordpressAdminProps.Initializer"></a>

```typescript
import { WordpressAdminProps } from 'cdk-wordpress-serverless'

const wordpressAdminProps: WordpressAdminProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-wordpress-serverless.WordpressAdminProps.property.email">email</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.WordpressAdminProps.property.password">password</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.WordpressAdminProps.property.username">username</a></code> | <code>string</code> | *No description.* |

---

##### `email`<sup>Required</sup> <a name="email" id="cdk-wordpress-serverless.WordpressAdminProps.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

---

##### `password`<sup>Optional</sup> <a name="password" id="cdk-wordpress-serverless.WordpressAdminProps.property.password"></a>

```typescript
public readonly password: string;
```

- *Type:* string

---

##### `username`<sup>Optional</sup> <a name="username" id="cdk-wordpress-serverless.WordpressAdminProps.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

---

### WordpressDatabaseProps <a name="WordpressDatabaseProps" id="cdk-wordpress-serverless.WordpressDatabaseProps"></a>

#### Initializer <a name="Initializer" id="cdk-wordpress-serverless.WordpressDatabaseProps.Initializer"></a>

```typescript
import { WordpressDatabaseProps } from 'cdk-wordpress-serverless'

const wordpressDatabaseProps: WordpressDatabaseProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-wordpress-serverless.WordpressDatabaseProps.property.password">password</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.WordpressDatabaseProps.property.username">username</a></code> | <code>string</code> | *No description.* |

---

##### `password`<sup>Optional</sup> <a name="password" id="cdk-wordpress-serverless.WordpressDatabaseProps.property.password"></a>

```typescript
public readonly password: string;
```

- *Type:* string

---

##### `username`<sup>Optional</sup> <a name="username" id="cdk-wordpress-serverless.WordpressDatabaseProps.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IWordpressContainerProps <a name="IWordpressContainerProps" id="cdk-wordpress-serverless.IWordpressContainerProps"></a>

- *Implemented By:* <a href="#cdk-wordpress-serverless.IWordpressContainerProps">IWordpressContainerProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-wordpress-serverless.IWordpressContainerProps.property.containerCpu">containerCpu</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressContainerProps.property.containerMemory">containerMemory</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressContainerProps.property.wordpressDockerImageBase">wordpressDockerImageBase</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressContainerProps.property.wordpressMemoryLimit">wordpressMemoryLimit</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressContainerProps.property.wp2StaticS3AddonVersion">wp2StaticS3AddonVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressContainerProps.property.wp2StaticVersion">wp2StaticVersion</a></code> | <code>string</code> | *No description.* |

---

##### `containerCpu`<sup>Optional</sup> <a name="containerCpu" id="cdk-wordpress-serverless.IWordpressContainerProps.property.containerCpu"></a>

```typescript
public readonly containerCpu: number;
```

- *Type:* number
- *Default:* 256

---

##### `containerMemory`<sup>Optional</sup> <a name="containerMemory" id="cdk-wordpress-serverless.IWordpressContainerProps.property.containerMemory"></a>

```typescript
public readonly containerMemory: number;
```

- *Type:* number
- *Default:* 512

---

##### `wordpressDockerImageBase`<sup>Optional</sup> <a name="wordpressDockerImageBase" id="cdk-wordpress-serverless.IWordpressContainerProps.property.wordpressDockerImageBase"></a>

```typescript
public readonly wordpressDockerImageBase: string;
```

- *Type:* string
- *Default:* wordpress:php7.4-apache

---

##### `wordpressMemoryLimit`<sup>Optional</sup> <a name="wordpressMemoryLimit" id="cdk-wordpress-serverless.IWordpressContainerProps.property.wordpressMemoryLimit"></a>

```typescript
public readonly wordpressMemoryLimit: string;
```

- *Type:* string
- *Default:* 256M

---

##### `wp2StaticS3AddonVersion`<sup>Optional</sup> <a name="wp2StaticS3AddonVersion" id="cdk-wordpress-serverless.IWordpressContainerProps.property.wp2StaticS3AddonVersion"></a>

```typescript
public readonly wp2StaticS3AddonVersion: string;
```

- *Type:* string
- *Default:* 1.0

---

##### `wp2StaticVersion`<sup>Optional</sup> <a name="wp2StaticVersion" id="cdk-wordpress-serverless.IWordpressContainerProps.property.wp2StaticVersion"></a>

```typescript
public readonly wp2StaticVersion: string;
```

- *Type:* string
- *Default:* 7.1.7

---

### IWordpressServerlessProps <a name="IWordpressServerlessProps" id="cdk-wordpress-serverless.IWordpressServerlessProps"></a>

- *Implemented By:* <a href="#cdk-wordpress-serverless.IWordpressServerlessProps">IWordpressServerlessProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps.property.fullyQualifiedSiteName">fullyQualifiedSiteName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps.property.hostedZone">hostedZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps.property.wordpressAdminProps">wordpressAdminProps</a></code> | <code><a href="#cdk-wordpress-serverless.WordpressAdminProps">WordpressAdminProps</a></code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps.property.ecsCluster">ecsCluster</a></code> | <code>aws-cdk-lib.aws_ecs.ICluster</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps.property.runWpAdmin">runWpAdmin</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps.property.wordpressContainerProps">wordpressContainerProps</a></code> | <code><a href="#cdk-wordpress-serverless.IWordpressContainerProps">IWordpressContainerProps</a></code> | *No description.* |

---

##### `fullyQualifiedSiteName`<sup>Required</sup> <a name="fullyQualifiedSiteName" id="cdk-wordpress-serverless.IWordpressServerlessProps.property.fullyQualifiedSiteName"></a>

```typescript
public readonly fullyQualifiedSiteName: string;
```

- *Type:* string

---

##### `hostedZone`<sup>Required</sup> <a name="hostedZone" id="cdk-wordpress-serverless.IWordpressServerlessProps.property.hostedZone"></a>

```typescript
public readonly hostedZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

---

##### `wordpressAdminProps`<sup>Required</sup> <a name="wordpressAdminProps" id="cdk-wordpress-serverless.IWordpressServerlessProps.property.wordpressAdminProps"></a>

```typescript
public readonly wordpressAdminProps: WordpressAdminProps;
```

- *Type:* <a href="#cdk-wordpress-serverless.WordpressAdminProps">WordpressAdminProps</a>

---

##### `ecsCluster`<sup>Optional</sup> <a name="ecsCluster" id="cdk-wordpress-serverless.IWordpressServerlessProps.property.ecsCluster"></a>

```typescript
public readonly ecsCluster: ICluster;
```

- *Type:* aws-cdk-lib.aws_ecs.ICluster

---

##### `runWpAdmin`<sup>Optional</sup> <a name="runWpAdmin" id="cdk-wordpress-serverless.IWordpressServerlessProps.property.runWpAdmin"></a>

```typescript
public readonly runWpAdmin: boolean;
```

- *Type:* boolean

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="cdk-wordpress-serverless.IWordpressServerlessProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `wordpressContainerProps`<sup>Optional</sup> <a name="wordpressContainerProps" id="cdk-wordpress-serverless.IWordpressServerlessProps.property.wordpressContainerProps"></a>

```typescript
public readonly wordpressContainerProps: IWordpressContainerProps;
```

- *Type:* <a href="#cdk-wordpress-serverless.IWordpressContainerProps">IWordpressContainerProps</a>

---

