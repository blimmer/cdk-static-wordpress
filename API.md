# replace this
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### WordpressServerless <a name="WordpressServerless" id="@blimmer/cdk-wordpress-serverless.WordpressServerless"></a>

#### Initializers <a name="Initializers" id="@blimmer/cdk-wordpress-serverless.WordpressServerless.Initializer"></a>

```typescript
import { WordpressServerless } from '@blimmer/cdk-wordpress-serverless'

new WordpressServerless(scope: Construct, id: string, props: WordpressServerlessProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.props">props</a></code> | <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerlessProps">WordpressServerlessProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@blimmer/cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@blimmer/cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@blimmer/cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.props"></a>

- *Type:* <a href="#@blimmer/cdk-wordpress-serverless.WordpressServerlessProps">WordpressServerlessProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerless.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@blimmer/cdk-wordpress-serverless.WordpressServerless.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerless.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@blimmer/cdk-wordpress-serverless.WordpressServerless.isConstruct"></a>

```typescript
import { WordpressServerless } from '@blimmer/cdk-wordpress-serverless'

WordpressServerless.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@blimmer/cdk-wordpress-serverless.WordpressServerless.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerless.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@blimmer/cdk-wordpress-serverless.WordpressServerless.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### WordpressAdminProps <a name="WordpressAdminProps" id="@blimmer/cdk-wordpress-serverless.WordpressAdminProps"></a>

#### Initializer <a name="Initializer" id="@blimmer/cdk-wordpress-serverless.WordpressAdminProps.Initializer"></a>

```typescript
import { WordpressAdminProps } from '@blimmer/cdk-wordpress-serverless'

const wordpressAdminProps: WordpressAdminProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressAdminProps.property.email">email</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressAdminProps.property.password">password</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressAdminProps.property.username">username</a></code> | <code>string</code> | *No description.* |

---

##### `email`<sup>Required</sup> <a name="email" id="@blimmer/cdk-wordpress-serverless.WordpressAdminProps.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

---

##### `password`<sup>Optional</sup> <a name="password" id="@blimmer/cdk-wordpress-serverless.WordpressAdminProps.property.password"></a>

```typescript
public readonly password: string;
```

- *Type:* string

---

##### `username`<sup>Optional</sup> <a name="username" id="@blimmer/cdk-wordpress-serverless.WordpressAdminProps.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

---

### WordpressDatabaseProps <a name="WordpressDatabaseProps" id="@blimmer/cdk-wordpress-serverless.WordpressDatabaseProps"></a>

#### Initializer <a name="Initializer" id="@blimmer/cdk-wordpress-serverless.WordpressDatabaseProps.Initializer"></a>

```typescript
import { WordpressDatabaseProps } from '@blimmer/cdk-wordpress-serverless'

const wordpressDatabaseProps: WordpressDatabaseProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressDatabaseProps.property.password">password</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressDatabaseProps.property.username">username</a></code> | <code>string</code> | *No description.* |

---

##### `password`<sup>Optional</sup> <a name="password" id="@blimmer/cdk-wordpress-serverless.WordpressDatabaseProps.property.password"></a>

```typescript
public readonly password: string;
```

- *Type:* string

---

##### `username`<sup>Optional</sup> <a name="username" id="@blimmer/cdk-wordpress-serverless.WordpressDatabaseProps.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

---

### WordpressDockerImageProps <a name="WordpressDockerImageProps" id="@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps"></a>

#### Initializer <a name="Initializer" id="@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.Initializer"></a>

```typescript
import { WordpressDockerImageProps } from '@blimmer/cdk-wordpress-serverless'

const wordpressDockerImageProps: WordpressDockerImageProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.property.containerCpu">containerCpu</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.property.containerMemory">containerMemory</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.property.wordpressDockerImageBase">wordpressDockerImageBase</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.property.wordpressMemoryLimit">wordpressMemoryLimit</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.property.wp2StaticS3AddonVersion">wp2StaticS3AddonVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.property.wp2StaticVersion">wp2StaticVersion</a></code> | <code>string</code> | *No description.* |

---

##### `containerCpu`<sup>Optional</sup> <a name="containerCpu" id="@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.property.containerCpu"></a>

```typescript
public readonly containerCpu: number;
```

- *Type:* number
- *Default:* 256

---

##### `containerMemory`<sup>Optional</sup> <a name="containerMemory" id="@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.property.containerMemory"></a>

```typescript
public readonly containerMemory: number;
```

- *Type:* number
- *Default:* 512

---

##### `wordpressDockerImageBase`<sup>Optional</sup> <a name="wordpressDockerImageBase" id="@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.property.wordpressDockerImageBase"></a>

```typescript
public readonly wordpressDockerImageBase: string;
```

- *Type:* string
- *Default:* wordpress:php7.4-apache

---

##### `wordpressMemoryLimit`<sup>Optional</sup> <a name="wordpressMemoryLimit" id="@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.property.wordpressMemoryLimit"></a>

```typescript
public readonly wordpressMemoryLimit: string;
```

- *Type:* string
- *Default:* 256M

---

##### `wp2StaticS3AddonVersion`<sup>Optional</sup> <a name="wp2StaticS3AddonVersion" id="@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.property.wp2StaticS3AddonVersion"></a>

```typescript
public readonly wp2StaticS3AddonVersion: string;
```

- *Type:* string
- *Default:* 1.0

---

##### `wp2StaticVersion`<sup>Optional</sup> <a name="wp2StaticVersion" id="@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps.property.wp2StaticVersion"></a>

```typescript
public readonly wp2StaticVersion: string;
```

- *Type:* string
- *Default:* 7.1.7

---

### WordpressServerlessProps <a name="WordpressServerlessProps" id="@blimmer/cdk-wordpress-serverless.WordpressServerlessProps"></a>

#### Initializer <a name="Initializer" id="@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.Initializer"></a>

```typescript
import { WordpressServerlessProps } from '@blimmer/cdk-wordpress-serverless'

const wordpressServerlessProps: WordpressServerlessProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.fullyQualifiedSiteName">fullyQualifiedSiteName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.hostedZone">hostedZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.wordpressAdminProps">wordpressAdminProps</a></code> | <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressAdminProps">WordpressAdminProps</a></code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.ecsCluster">ecsCluster</a></code> | <code>aws-cdk-lib.aws_ecs.ICluster</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.runWpAdmin">runWpAdmin</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.wordpressDockerImageProps">wordpressDockerImageProps</a></code> | <code><a href="#@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps">WordpressDockerImageProps</a></code> | *No description.* |

---

##### `fullyQualifiedSiteName`<sup>Required</sup> <a name="fullyQualifiedSiteName" id="@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.fullyQualifiedSiteName"></a>

```typescript
public readonly fullyQualifiedSiteName: string;
```

- *Type:* string

---

##### `hostedZone`<sup>Required</sup> <a name="hostedZone" id="@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.hostedZone"></a>

```typescript
public readonly hostedZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

---

##### `wordpressAdminProps`<sup>Required</sup> <a name="wordpressAdminProps" id="@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.wordpressAdminProps"></a>

```typescript
public readonly wordpressAdminProps: WordpressAdminProps;
```

- *Type:* <a href="#@blimmer/cdk-wordpress-serverless.WordpressAdminProps">WordpressAdminProps</a>

---

##### `ecsCluster`<sup>Optional</sup> <a name="ecsCluster" id="@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.ecsCluster"></a>

```typescript
public readonly ecsCluster: ICluster;
```

- *Type:* aws-cdk-lib.aws_ecs.ICluster

---

##### `runWpAdmin`<sup>Optional</sup> <a name="runWpAdmin" id="@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.runWpAdmin"></a>

```typescript
public readonly runWpAdmin: boolean;
```

- *Type:* boolean

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `wordpressDockerImageProps`<sup>Optional</sup> <a name="wordpressDockerImageProps" id="@blimmer/cdk-wordpress-serverless.WordpressServerlessProps.property.wordpressDockerImageProps"></a>

```typescript
public readonly wordpressDockerImageProps: WordpressDockerImageProps;
```

- *Type:* <a href="#@blimmer/cdk-wordpress-serverless.WordpressDockerImageProps">WordpressDockerImageProps</a>

---



