# replace this
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### StaticWordpress <a name="StaticWordpress" id="@blimmer/cdk-static-wordpress.StaticWordpress"></a>

#### Initializers <a name="Initializers" id="@blimmer/cdk-static-wordpress.StaticWordpress.Initializer"></a>

```typescript
import { StaticWordpress } from '@blimmer/cdk-static-wordpress'

new StaticWordpress(scope: Construct, id: string, props: StaticWordpressProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpress.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpress.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpress.Initializer.parameter.props">props</a></code> | <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpressProps">StaticWordpressProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@blimmer/cdk-static-wordpress.StaticWordpress.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@blimmer/cdk-static-wordpress.StaticWordpress.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@blimmer/cdk-static-wordpress.StaticWordpress.Initializer.parameter.props"></a>

- *Type:* <a href="#@blimmer/cdk-static-wordpress.StaticWordpressProps">StaticWordpressProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpress.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@blimmer/cdk-static-wordpress.StaticWordpress.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpress.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@blimmer/cdk-static-wordpress.StaticWordpress.isConstruct"></a>

```typescript
import { StaticWordpress } from '@blimmer/cdk-static-wordpress'

StaticWordpress.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@blimmer/cdk-static-wordpress.StaticWordpress.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpress.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@blimmer/cdk-static-wordpress.StaticWordpress.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### StaticWordpressProps <a name="StaticWordpressProps" id="@blimmer/cdk-static-wordpress.StaticWordpressProps"></a>

#### Initializer <a name="Initializer" id="@blimmer/cdk-static-wordpress.StaticWordpressProps.Initializer"></a>

```typescript
import { StaticWordpressProps } from '@blimmer/cdk-static-wordpress'

const staticWordpressProps: StaticWordpressProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpressProps.property.fullyQualifiedSiteName">fullyQualifiedSiteName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpressProps.property.hostedZone">hostedZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpressProps.property.wordpressAdminProps">wordpressAdminProps</a></code> | <code><a href="#@blimmer/cdk-static-wordpress.WordpressAdminProps">WordpressAdminProps</a></code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpressProps.property.ecsCluster">ecsCluster</a></code> | <code>aws-cdk-lib.aws_ecs.ICluster</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpressProps.property.runWpAdmin">runWpAdmin</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpressProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.StaticWordpressProps.property.wordpressDockerImageProps">wordpressDockerImageProps</a></code> | <code><a href="#@blimmer/cdk-static-wordpress.WordpressDockerImageProps">WordpressDockerImageProps</a></code> | *No description.* |

---

##### `fullyQualifiedSiteName`<sup>Required</sup> <a name="fullyQualifiedSiteName" id="@blimmer/cdk-static-wordpress.StaticWordpressProps.property.fullyQualifiedSiteName"></a>

```typescript
public readonly fullyQualifiedSiteName: string;
```

- *Type:* string

---

##### `hostedZone`<sup>Required</sup> <a name="hostedZone" id="@blimmer/cdk-static-wordpress.StaticWordpressProps.property.hostedZone"></a>

```typescript
public readonly hostedZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

---

##### `wordpressAdminProps`<sup>Required</sup> <a name="wordpressAdminProps" id="@blimmer/cdk-static-wordpress.StaticWordpressProps.property.wordpressAdminProps"></a>

```typescript
public readonly wordpressAdminProps: WordpressAdminProps;
```

- *Type:* <a href="#@blimmer/cdk-static-wordpress.WordpressAdminProps">WordpressAdminProps</a>

---

##### `ecsCluster`<sup>Optional</sup> <a name="ecsCluster" id="@blimmer/cdk-static-wordpress.StaticWordpressProps.property.ecsCluster"></a>

```typescript
public readonly ecsCluster: ICluster;
```

- *Type:* aws-cdk-lib.aws_ecs.ICluster

---

##### `runWpAdmin`<sup>Optional</sup> <a name="runWpAdmin" id="@blimmer/cdk-static-wordpress.StaticWordpressProps.property.runWpAdmin"></a>

```typescript
public readonly runWpAdmin: boolean;
```

- *Type:* boolean

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@blimmer/cdk-static-wordpress.StaticWordpressProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `wordpressDockerImageProps`<sup>Optional</sup> <a name="wordpressDockerImageProps" id="@blimmer/cdk-static-wordpress.StaticWordpressProps.property.wordpressDockerImageProps"></a>

```typescript
public readonly wordpressDockerImageProps: WordpressDockerImageProps;
```

- *Type:* <a href="#@blimmer/cdk-static-wordpress.WordpressDockerImageProps">WordpressDockerImageProps</a>

---

### WordpressAdminProps <a name="WordpressAdminProps" id="@blimmer/cdk-static-wordpress.WordpressAdminProps"></a>

#### Initializer <a name="Initializer" id="@blimmer/cdk-static-wordpress.WordpressAdminProps.Initializer"></a>

```typescript
import { WordpressAdminProps } from '@blimmer/cdk-static-wordpress'

const wordpressAdminProps: WordpressAdminProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@blimmer/cdk-static-wordpress.WordpressAdminProps.property.email">email</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.WordpressAdminProps.property.password">password</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.WordpressAdminProps.property.username">username</a></code> | <code>string</code> | *No description.* |

---

##### `email`<sup>Required</sup> <a name="email" id="@blimmer/cdk-static-wordpress.WordpressAdminProps.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

---

##### `password`<sup>Optional</sup> <a name="password" id="@blimmer/cdk-static-wordpress.WordpressAdminProps.property.password"></a>

```typescript
public readonly password: string;
```

- *Type:* string

---

##### `username`<sup>Optional</sup> <a name="username" id="@blimmer/cdk-static-wordpress.WordpressAdminProps.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

---

### WordpressDatabaseProps <a name="WordpressDatabaseProps" id="@blimmer/cdk-static-wordpress.WordpressDatabaseProps"></a>

#### Initializer <a name="Initializer" id="@blimmer/cdk-static-wordpress.WordpressDatabaseProps.Initializer"></a>

```typescript
import { WordpressDatabaseProps } from '@blimmer/cdk-static-wordpress'

const wordpressDatabaseProps: WordpressDatabaseProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@blimmer/cdk-static-wordpress.WordpressDatabaseProps.property.password">password</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.WordpressDatabaseProps.property.username">username</a></code> | <code>string</code> | *No description.* |

---

##### `password`<sup>Optional</sup> <a name="password" id="@blimmer/cdk-static-wordpress.WordpressDatabaseProps.property.password"></a>

```typescript
public readonly password: string;
```

- *Type:* string

---

##### `username`<sup>Optional</sup> <a name="username" id="@blimmer/cdk-static-wordpress.WordpressDatabaseProps.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

---

### WordpressDockerImageProps <a name="WordpressDockerImageProps" id="@blimmer/cdk-static-wordpress.WordpressDockerImageProps"></a>

#### Initializer <a name="Initializer" id="@blimmer/cdk-static-wordpress.WordpressDockerImageProps.Initializer"></a>

```typescript
import { WordpressDockerImageProps } from '@blimmer/cdk-static-wordpress'

const wordpressDockerImageProps: WordpressDockerImageProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@blimmer/cdk-static-wordpress.WordpressDockerImageProps.property.containerCpu">containerCpu</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.WordpressDockerImageProps.property.containerMemory">containerMemory</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.WordpressDockerImageProps.property.wordpressDockerImageBase">wordpressDockerImageBase</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.WordpressDockerImageProps.property.wordpressMemoryLimit">wordpressMemoryLimit</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.WordpressDockerImageProps.property.wp2StaticS3AddonVersion">wp2StaticS3AddonVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@blimmer/cdk-static-wordpress.WordpressDockerImageProps.property.wp2StaticVersion">wp2StaticVersion</a></code> | <code>string</code> | *No description.* |

---

##### `containerCpu`<sup>Optional</sup> <a name="containerCpu" id="@blimmer/cdk-static-wordpress.WordpressDockerImageProps.property.containerCpu"></a>

```typescript
public readonly containerCpu: number;
```

- *Type:* number
- *Default:* 256

---

##### `containerMemory`<sup>Optional</sup> <a name="containerMemory" id="@blimmer/cdk-static-wordpress.WordpressDockerImageProps.property.containerMemory"></a>

```typescript
public readonly containerMemory: number;
```

- *Type:* number
- *Default:* 512

---

##### `wordpressDockerImageBase`<sup>Optional</sup> <a name="wordpressDockerImageBase" id="@blimmer/cdk-static-wordpress.WordpressDockerImageProps.property.wordpressDockerImageBase"></a>

```typescript
public readonly wordpressDockerImageBase: string;
```

- *Type:* string
- *Default:* wordpress:php7.4-apache

---

##### `wordpressMemoryLimit`<sup>Optional</sup> <a name="wordpressMemoryLimit" id="@blimmer/cdk-static-wordpress.WordpressDockerImageProps.property.wordpressMemoryLimit"></a>

```typescript
public readonly wordpressMemoryLimit: string;
```

- *Type:* string
- *Default:* 256M

---

##### `wp2StaticS3AddonVersion`<sup>Optional</sup> <a name="wp2StaticS3AddonVersion" id="@blimmer/cdk-static-wordpress.WordpressDockerImageProps.property.wp2StaticS3AddonVersion"></a>

```typescript
public readonly wp2StaticS3AddonVersion: string;
```

- *Type:* string
- *Default:* 1.0

---

##### `wp2StaticVersion`<sup>Optional</sup> <a name="wp2StaticVersion" id="@blimmer/cdk-static-wordpress.WordpressDockerImageProps.property.wp2StaticVersion"></a>

```typescript
public readonly wp2StaticVersion: string;
```

- *Type:* string
- *Default:* 7.1.7

---



